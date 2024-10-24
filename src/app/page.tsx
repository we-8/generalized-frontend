import Image from "next/image";
import { Herobanner } from "@/components";
import { hero2 } from "@/assets";
import '../styles/main-pages-css/HomePage.css';

const categories =['Test1','Test2','Test3','Test4']



export default function Home() {
  return (
      <div className="app__home--main-div">
        <Herobanner backgroundImage={hero2} title="Leading vacuum food & product ingredient supplier" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look" />
        <div className="app__home--category-section section__padding">

        </div>
        
      </div>
     
     

  
  );
}
