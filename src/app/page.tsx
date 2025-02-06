"use client"
import React, { useEffect, useState } from 'react';
import client from '@/db/DB'
import { Product } from './lib/action/Product';

const page = () => {
  const [ProductItem, SetProduct] = useState<Product[]>([])
  const Api = async () => {
    const data =await Product()
    SetProduct(data)
  }
  console.log(ProductItem);
  
  useEffect(() => {
    Api()
  }, [])
  return (
    <div>
      Shop
{
  ProductItem.length>0&&<div>
    
  </div>
}

    </div>
  );
};

export default page;