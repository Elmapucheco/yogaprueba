import React, { createContext, useContext } from "react";

// 1. Define el contexto SliderArrayContext
const SliderArrayContext = createContext([]);

// 2. Define y exporta el hook useSliderArray
export const useSliderArray = () => useContext(SliderArrayContext);

// 3. Define y exporta el proveedor SliderArrayProvider
export const SliderArrayProvider = ({ children, images }) => {
  return (
    <SliderArrayContext.Provider value={images}>
      {children}
    </SliderArrayContext.Provider>
  );
};
