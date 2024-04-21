import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Mobiles"}/>
      <HorizontalCardProduct category={"watches"} heading={"Top's Electronic"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Home Appliances"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Bikes"}/>
      <VerticalCardProduct category={"televisions"} heading={"Property"}/>
      <VerticalCardProduct category={"camera"} heading={"Services"}/>
      <VerticalCardProduct category={"earphones"} heading={"Fashion"}/>
      <VerticalCardProduct category={"speakers"} heading={"Books"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Pets"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Other"}/>
    </div>
  )
}

export default Home