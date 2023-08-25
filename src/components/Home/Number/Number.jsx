import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './number.css'

function Number() {

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: true, // Solo se activa una vez al entrar al viewport
  });

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (count1 < 20) {
        setCount1(count1 + 1);
      }
    }, 30);

    const interval2 = setInterval(() => {
      if (count2 < 200) {
        setCount2(count2 + 1);
      }
    }, 30);

    const interval3 = setInterval(() => {
      if (count3 < 10) {
        setCount3(count3 + 1);
      }
    }, 30);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [inView, count1, count2, count3]);

    return (
     <>
<div ref={ref} class="number  text-white font-poppins font-bold text-2xl">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="col-span-1 md:col-span-1">
        <h3><span id="count1" class="font-poppins font-bold text-5xl">{count1}</span> +</h3>
        <p class="mt-2 text-5xl font-poppins">Voluntarios</p>
      </div>
      <div class="col-span-1 md:col-span-1">
        <h3><span id="count2" class="font-poppins font-bold text-5xl">{count2}</span> +</h3>
        <p class="mt-2 text-5xl font-poppins">Familias felices</p>
      </div>
      <div class="col-span-1 md:col-span-1">
        <h3><span id="count3 font-poppins " class="font-bold text-5xl">{count3}</span> +</h3>
        <p class="mt-2 text-5xl font-poppins">Alianzas</p>
      </div>
    </div>
  </div>
</div>

     </>
    );
  }
  
  export default Number;