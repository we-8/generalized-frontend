import Image from "next/image";
import { Herobanner , Title ,Description , CommonButtons1 } from "@/components";
import { hero2,test1, who} from "@/assets";
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

        <div className="app__home--Who-we-are section__padding">
          <Image className="who-image" src={who} alt="Who we are section image" />
          <div className="app__home--Who-we-are-details">
            <Title title="Who we are"/>
            <Description description="Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur."/>
            <CommonButtons1 title="Get to know more"/>

          </div>

        </div>
        
      </div>
     
     

  
  );
}
