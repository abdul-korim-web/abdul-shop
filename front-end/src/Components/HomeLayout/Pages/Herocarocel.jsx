import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@mui/material/Button";
const Herocarocel = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "40px", left: "50%" }}>
        <ul style={{ display: "flex", gap: "5px" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                height: "15px",
                backgroundColor: "white",
                cursor: "pointer",
                borderRadius: "20px",
              }
            : {
                width: "15px",
                height: "15px",
                backgroundColor: "white",
                cursor: "pointer",
                borderRadius: "20px",
              }
        }
      ></div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          beforeChange: (prev, next) => {
            setDotActive(next);
          },
          appendDots: (dots) => (
            <div style={{ position: "absolute", bottom: "40px", left: "50%" }}>
              <ul style={{ display: "flex", gap: "5px" }}>{dots}</ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "10px",
                      height: "15px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      borderRadius: "20px",
                    }
                  : {
                      width: "5px",
                      height: "5px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      borderRadius: "20px",
                    }
              }
            ></div>
          ),
        },
      },
    ],
  };
  const bannerData = [
    {
      title: "Top selling smartphone And  Accessories",
      discount: "Discount of up to 40%",
      from: 599.99,
      sale: "Flash sale",
      image: "image/herobanner/banner1.jpg",
    },
    {
      title: "Latest gaming laptops And  Accessories",
      discount: "Discount of up to 30%",
      from: 1099.99,
      sale: "Mega sale",
      image: "image/herobanner/banner2.jpg",
    },
    {
      title: "Premium wireless earbuds And  Accessories",
      discount: "Discount of up to 25%",
      from: 129.99,
      sale: "Hot deal",
      image: "image/herobanner/banner3.jpg",
    },
  ];
  return (
    <Slider {...settings}>
      {/* maping banner data  */}
      {bannerData.map((item, index) => (
        <div key={index} className="h-[300px] md:h-[800px]  w-full relative   ">
          <img
            className="w-full h-full object-cover  "
            src={item?.image}
            alt={item?.image}
          />
          <div className="absolute bottom-10 md:bottom-[30%] left-[10%] flex flex-col space-y-3">
            <div className="bg-red-500 text-center rounded-xl w-[100px] md:w-[150px] ">
              <p className="text-sm  md:text-xl text-white font-bold ">
                FLASH SALE
              </p>
            </div>
            <div className="w-[65%]">
              <h2 className=" text-2xl md:text-5xl font-semibold text-white opacity-90 ">
                {item?.title}
              </h2>
            </div>
            <p className="text-sm md:text-xl font-semibold text-white opacity-90">
              {item?.discount}
            </p>
            <p className="text-white opacity-90 text-sm  md:text-xl">
              from{" "}
              <span className="text-2xl font-semibold ">${item?.from}</span>
            </p>
            <div>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "5px",
                  background: "black",
                  padding: "5px 30px",
                }}
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Herocarocel;
