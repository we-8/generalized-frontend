import {
  Herobanner2,
  TitleR,
  TitleL,
  DescriptionL,
  DescriptionR,
} from "@/components";
import Image from "next/image";
import { About_us_banner, our_story, Quote, our_comitment } from "@/assets";
import "../../styles/main-pages-css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="app__aboutUs--main-div">
      <div>
        <Herobanner2
          backgroundImage={About_us_banner}
          title="About Us"
          description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:"
        />
      </div>

      <div className="app__aboutUs--theStory-section section__padding">
        <Image
          className="story-section-image"
          src={our_story}
          alt="our story image"
        />
        <div className="app__aboutUs--theStory-details">
          <div className="story-section-line" />
          <TitleL title="Our Story: From Our Kitchen to Yours" />
          <DescriptionL
            description={
              <div>
                <p style={{ margin: "0.3em 0", textAlign: "justify" }}>
                  We understand what it feels like to miss home. For many of us
                  living overseas, food is more than just a meal. It is comfort,
                  culture, and connection.
                </p>
                <p style={{ margin: "0.3em 0", textAlign: "justify" }}>
                  That is why we started Ceylon Rich Products. Our goal is to
                  bring real Sri Lankan food to people who crave the familiar
                  tastes of their childhood, their families, and their island.
                </p>
                <p style={{ margin: "0.3em 0", textAlign: "justify" }}>
                  What started as a small home kitchen has grown into a trusted
                  brand loved by Sri Lankans around the world. Here is what
                  makes us special:
                </p>

                <ul
                  style={{
                    margin: "0.3em 0",
                    paddingLeft: "1.5em",
                    listStyleType: "disc",
                    textAlign: "left",
                  }}
                >
                  <li style={{ marginBottom: "0.7em" }}>
                    <strong>Authentic flavors.</strong> We use time-tested
                    recipes and spice blends passed down through generations
                  </li>
                  <li style={{ marginBottom: "0.7em" }}>
                    <strong>Premium quality.</strong> Our meals are freshly made
                    in Sri Lanka and vacuum-sealed to lock in taste and
                    freshness
                  </li>
                  <li style={{ marginBottom: "0.7em" }}>
                    <strong>Unmatched convenience.</strong> You get real,
                    ready-to-eat meals that taste homemade without spending
                    hours in the kitchen
                  </li>
                </ul>
              </div>
            }
          />
        </div>
      </div>
      <div className="app__aboutUs-quote-section section__padding">
        <Image className="quote-section-image" src={Quote} alt="quote" />
        <p className="quote_p">
          Every journey begins with a single step and a good snack ...
        </p>
        <div className="quote-section-line" />
      </div>
      <div className="app__aboutUs--commitment-section section__padding">
        <Image
          className="story-section-image"
          src={our_comitment}
          alt="Our Commitment"
        />
        <div className="app__aboutUs--commitment-details">
          <div className="story-section-line" />
          <TitleR title="Our Mission" />
          <DescriptionR
            description={
              <p style={{ textAlign: "justify" }}>
                At Ceylon Rich Products, our mission is simple but powerful. We
                want to bring a genuine taste of home to every Sri Lankan, no
                matter where life has taken them. Each bite of our food is made
                to remind you of family gatherings, familiar spices, and the
                warmth of your homeland. Feeling close to home is more than just
                a feeling. It is a comfort we believe everyone deserves.
              </p>
            }
          />
        </div>
      </div>
      {/* new section */}
      <div className="app__aboutUs--theStory-section section__padding">
        <Image
          className="story-section-image"
          src={our_story}
          alt="our story image"
        />
        <div className="app__aboutUs--theStory-details">
          <div className="story-section-line" />
          <TitleL title="Our Value" />
          <DescriptionL
            description={
              <div>
                <ul
                  style={{
                    paddingLeft: "1.5em",
                    listStyleType: "disc",
                    textAlign: "left",
                  }}
                >
                  <li style={{ marginBottom: "1em" }}>
                    <strong>Authentic Taste</strong>
                    <br />
                    We stay true to traditional Sri Lankan recipes and spices to
                    deliver the real flavors you remember and love.
                  </li>
                  <li style={{ marginBottom: "1em" }}>
                    <strong>Quality Ingredients</strong>
                    <br />
                    We carefully select fresh natural ingredients with no
                    artificial preservatives or fillers. Just pure wholesome
                    goodness.
                  </li>
                  <li style={{ marginBottom: "1em" }}>
                    <strong>Home Cooked Meals</strong>
                    <br />
                    Every dish is prepared with the care and attention of a home
                    kitchen made to nourish both body and soul.
                  </li>
                  <li style={{ marginBottom: "1em" }}>
                    <strong>Customer First Service</strong>
                    <br />
                    Your satisfaction matters most. We listen, support, and are
                    here to make your experience seamless and joyful.
                  </li>
                </ul>

                <p style={{ textAlign: "justify" }}>
                  We do not just sell food. We deliver memories. Each product
                  carries the love and care we would give to our own families.
                  Whether you are far from home or simply short on time, we are
                  here to make sure you never have to miss the true taste of Sri
                  Lanka.
                </p>
              </div>
            }
          />
        </div>
      </div>
      {/* new section */}
    </div>
  );
};

export default AboutUs;
