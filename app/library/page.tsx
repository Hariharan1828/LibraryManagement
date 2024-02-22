"use client"
import { SVGMaskEffectDemo } from '@/components/maskContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import BookTable from '@/components/BookTable';
  
  

const Page = () => {
    const [data, setData] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


    interface Book {
        id: number;
        title: string;
        author: string;
        genre: string;
        isbn: string;
        quantityAvailable: number;
      }
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get<Book[]>('http://localhost:8081/api/books/get');
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
  
    if (loading) {
      return <p>Loading...</p>;
    }
       

    return (
      <div>
        <SVGMaskEffectDemo/>
        <div className="container mx-auto mt-20 mb-10">
          <BookTable data={data??[]}/>

        </div>
      </div>
    );
};


export default Page