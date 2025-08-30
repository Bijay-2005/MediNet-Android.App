import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AdvertisingCard from "./AdvertisingCard";
import Autoplay from "embla-carousel-autoplay";

const AdvertisingCarousel = () => {
  const advertisingData = [
    {
      title: "Health Checkups",
      subtitle: "Up to 50% off",
      discount: "50% OFF",
      image: "🏥",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      title: "Lab Tests",
      subtitle: "Fast & Accurate",
      discount: "30% OFF",
      image: "🧪",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600"
    },
    {
      title: "Home Collection",
      subtitle: "Safe & Convenient",
      discount: "Free",
      image: "🏠",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-600"
    },
    {
      title: "Expert Reports",
      subtitle: "Within 12 hours",
      discount: "Premium",
      image: "📋",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-600"
    }
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }) as any,
      ]}
      className="w-full max-w-sm mx-auto"
    >
      <CarouselContent>
        {advertisingData.map((ad, index) => (
          <CarouselItem key={index}>
            <AdvertisingCard
              title={ad.title}
              subtitle={ad.subtitle}
              discount={ad.discount}
              image={ad.image}
              bgColor={ad.bgColor}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AdvertisingCarousel;