import { useState } from "react";
import { Flex, Text, Box, Image, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
const Carousel = () => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };
  const slides = [
    {
      title: "Acharya ERP",
      description:
        "This is the minimal Acharya ERP, where acharyan's can access all the perks in there fingertip.",
      img: "https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      title: "Acharya ERP",
      description:
        "This is the minimal Acharya ERP, where acharyan's can access all the perks in there fingertip.",

      img: "https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      title: "Acharya ERP",
      description:
        "This is the minimal Acharya ERP, where acharyan's can access all the perks in there fingertip.",

      img: "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    },
    {
      title: "Acharya ERP",
      description:
        "This is the minimal Acharya ERP, where acharyan's can access all the perks in there fingertip.",

      img: "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      title: "Acharya ERP",
      description:
        "This is the minimal Acharya ERP, where acharyan's can access all the perks in there fingertip.",

      img: "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  useEffect(() => {
    let interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Flex
      w="full"
      _dark={{
        bg: "transparent",
      }}
      bg="#DEE2FF"
      className="p-10 mobile:p-4 "
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex h="400px" w="full" {...carouselStyle} pos="relative">
          {slides.map((slide, sid) => (
            <Box
              key={`slide-${sid}`}
              boxSize="full"
              shadow="md"
              flex="none"
              rounded={10}
              cursor="pointer"
              className="relative"
            >
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
                rounded={10}
              />
              <Text
                fontSize={40}
                fontWeight="extrabold"
                color="white"
                p="8px 12px"
                className="absolute top-5 left-15"
              >
                {slide.title}
              </Text>
              <Text
                fontSize={20}
                p="8px 12px"
                className="absolute top-20"
                color="white"
                fontWeight="bold"
              >
                {slide.description}
              </Text>
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({
            length: slidesCount,
          }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", null, "10px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{
                bg: "blackAlpha.800",
              }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};

export { Carousel };
