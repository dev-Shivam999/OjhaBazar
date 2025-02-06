const { PrismaClient }= require( '@prisma/client')

const prisma = new PrismaClient()
const  { Decimal }= require( "@prisma/client/runtime/library")


async function main() {
    console.log("Seeding database...");

    // Create categories
    const electronics = await prisma.category.create({
        data: { name: "Electronics" },
    });

    const fashion = await prisma.category.create({
        data: { name: "Fashion" },
    });

    // Create users
    const user1 = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john@example.com",
            password: "hashedpassword",
            role: "CUSTOMER",
            addresses: {
                create: [{
                    fullName: "John Doe",
                    phone: "1234567890",
                    street: "123 Main St",
                    city: "New York",
                    state: "NY",
                    country: "USA",
                    zipCode: "10001",
                }],
            },
        },
        include: { addresses: true },
    });

    // Create products
    const product1 = await prisma.product.create({
        data: {
            title: "Smartphone",
            description: "Latest model with high-end specs",
            price: new Decimal(699.99),
            stock: 10,
            imageUrl: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F80%2Fc2%2F80c2cabbabc937b0a81021c818e535768e8f20f8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fminiature%5D",
            categoryId: electronics.id,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            title: "Men's T-Shirt",
            description: "Comfortable and stylish",
            price: new Decimal(19.99),
            stock: 50,
            imageUrl: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F80%2Fc2%2F80c2cabbabc937b0a81021c818e535768e8f20f8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fminiature%5D",
            categoryId: fashion.id,
        },
    });

    // Create cart and add items
    const cart = await prisma.cart.create({
        data: {
            userId: user1.id,
            items: {
                create: [{
                    productId: product1.id,
                    quantity: 1,
                }],
            },
        },
    });

    // Create order
    const order = await prisma.order.create({
        data: {
            userId: user1.id,
            addressId: user1.addresses[0].id,
            totalAmount: new Decimal(699.99),
            status: "PENDING",
            orderItems: {
                create: [{
                    productId: product1.id,
                    quantity: 1,
                    price: new Decimal(699.99),
                }],
            },
            payment: {
                create: {
                    amount: new Decimal(699.99),
                    status: "PENDING",
                    provider: "Stripe",
                },
            },
        },
    });

    // Create coupon
    await prisma.coupon.create({
        data: {
            code: "DISCOUNT10",
            discount: new Decimal(10.0),
            validTill: new Date("2025-12-31"),
            isActive: true,
        },
    });

    console.log("Database seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
