import Image from "next/image";
import { Herobanner } from "@/components";
import { hero2,test1 } from "@/assets";
import '../styles/main-pages-css/HomePage.css';

type Category = {
  title: string;
};
const categories:Category[] =[{title:'Test1'},{title:'Test2'},{title:'Test3'},{title:'Test4'}]



export default function Home() {
  return (
      <div className="app__home--main-div">
        <Herobanner backgroundImage={hero2} title="Leading vacuum food & product ingredient supplier" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look" />
        <div className="app__home--category-section section__padding">
          {categories.map((categories,index)=>(
            <div key={index} className="app__home--category-item">
              <Image className="category-image" src={test1} alt="category image"/>
              <p className="category-title">{categories.title}</p>
            </div>
          ))}

        </div>
        
      </div>
     
     

  
  );
}
