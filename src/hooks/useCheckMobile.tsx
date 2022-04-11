import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import  useWindowWidth from "./useWindowWidth";

function useCheckMobile (){
    return useWindowWidth() < 950;
}
export default useCheckMobile;