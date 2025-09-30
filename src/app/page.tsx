import Image from "next/image";
import {
  Herobanner,
  Title,
  PeopleReview,
  Description,
 
  SpecialOffers,
  LatestProducts,
} from "@/components";
import { home_banner, test1, who, Cashew, who_we_are } from "@/assets";
import "../styles/main-pages-css/HomePage.css";
import Link from "next/link";
import { AboutUs } from "@/components/CommonButtons/CommonButtons";

type Category = {
  title: string;
};
const categories: Category[] = [
  { title: "Test1" },
  { title: "Test2" },
  { title: "Test3" },
  { title: "Test4" },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function Home() {
  return (
    <div className="app__home--main-div">
      <Herobanner
        backgroundImage={home_banner}
        title="Welcome to Ceylon Rich Products"
        description="The real taste of Sri Lanka, delivered fresh to your doorstep."
      />

      <div className="app__home--category-section section__padding">
        {categories.map((categories, index) => (
          <div key={index} className="app__home--category-item">
            <Image
              className="category-image"
              src={test1}
              alt="category image"
            />
            <Link href="/single-product">
              <p className="category-title">{categories.title}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="app__home--Who-we-are section__padding">
        <Image
          className="who-image"
          src={who_we_are}
          alt="Who we are section image"
        />
        <div className="app__home--Who-we-are-details">
          <Title title="Who we are" />
          <Description
            description={
              <>
                Missing the flavors of home? You are not alone. For many Sri
                Lankans living overseas, finding real, homemade Sri Lankan food
                can feel impossible. Even if you are still on the island,
                sometimes you just want a delicious meal without the hassle of
                cooking.
                <br />
                <br />
                That is where we come in.
                <br />
                <br />
                Ceylon Rich Products is your trusted source for ready-to-eat Sri
                Lankan meals and snacks. Each item is lovingly made using
                traditional recipes and vacuum-packed to keep it fresh longer.
                <br />
                <br />
                We specialize in:
                <br />
                <strong>
                  • Authentic dishes made with real Sri Lankan spices
                </strong>
                <br />
                • No added preservatives or artificial ingredients
                <br />
                • Convenient vacuum-packed meals and snacks that stay fresh for
                weeks
                <br />
                • Local delivery across Sri Lanka and global shipping for our
                community abroad
                <br />
                <br />
                Whether you are in Canada, Australia, Germany, or just down the
                road in Colombo, we make it easy to enjoy the food you grew up
                with. Anytime. Anywhere.
                <br />
                <br />
                Explore our collection and taste the difference.
              </>
            }
          />
          <AboutUs title="Get to know more" />
        </div>
      </div>
      <div className="app__home--Special-offer">
        <SpecialOffers />
      </div>
      <div>
        <LatestProducts />
      </div>
      <div>
        <PeopleReview />
      </div>
    </div>
  );
}