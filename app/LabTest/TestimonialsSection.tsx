import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TestimonialsSection = () => {
  const testimonials = [{
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Booking was incredibly easy and the phlebotomist was very skilled and gentle. I got my reports back faster than I expected. Great experience overall!"
  }, {
    name: "Rahul Patel",
    location: "Delhi",
    rating: 5,
    text: "The home collection service was excellent. Professional staff and quick results. Highly recommend LabLink for health checkups."
  }, {
    name: "Anjali Singh",
    location: "Bangalore",
    rating: 5,
    text: "Very convenient and reliable service. The comprehensive health package gave me peace of mind about my health status."
  }];
  
  return <section className="bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            We leave a smile on our customer's face! 😊
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-md mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="bg-card shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    
                    <p className="text-muted-foreground italic text-sm leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>;
};
export default TestimonialsSection;