import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel";
import { Quote, Star } from "lucide-react";
import styles from "./Testimonials.module.css";

interface Testimonial {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    client: "Cmdr. Riker",
    role: "First Officer",
    company: "Starfleet Command",
    quote:
      "The system architecture provided by COMPND.SYSTEMS exceeded all operational parameters. Their ability to integrate with legacy isolinear chips while preparing for bio-neural gel packs is unmatched.",
    rating: 5,
  },
  {
    id: "2",
    client: "L. Troi",
    role: "Counselor",
    company: "Betazed Diplomatic Corps",
    quote:
      "I sense a great deal of dedication in their work. The user experience is intuitive and empathetic to the operator's needs.",
    rating: 5,
  },
  {
    id: "3",
    client: "G. La Forge",
    role: "Chief Engineer",
    company: "Utopia Planitia Shipyards",
    quote:
      "Efficiency is up 400%. The diagnostic tools they built allow us to identify warp core fluctuations before they even happen.",
    rating: 5,
  },
  {
    id: "4",
    client: "K. Janeway",
    role: "Captain",
    company: "Voyager Initiative",
    quote:
      "When you're 70,000 light years from home, you need software that doesn't fail. COMPND.SYSTEMS delivered exactly that.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>MISSION REPORTS</h3>
        <div className={styles.decorLine} />
      </div>
      
      <Carousel className={styles.carousel}>
        <CarouselContent>
          {testimonials.map((item) => (
            <CarouselItem key={item.id} className={styles.carouselItem}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.quoteIcon}>
                    <Quote size={24} />
                  </div>
                  <div className={styles.rating}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                
                <blockquote className={styles.quote}>
                  "{item.quote}"
                </blockquote>
                
                <div className={styles.footer}>
                  <div className={styles.clientInfo}>
                    <div className={styles.clientName}>{item.client}</div>
                    <div className={styles.clientRole}>
                      {item.role} // {item.company}
                    </div>
                  </div>
                  <div className={styles.idBadge}>
                    LOG-{item.id.padStart(3, '0')}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className={styles.controls}>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};