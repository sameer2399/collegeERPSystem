import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { Carousel, CategoryCard, JoinCommunity } from "../../Components";

const Home = () => {
  return (
    <div className="flex justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Acharya ERP</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <Carousel />
        <Box width="100%">
          <CategoryCard />
        </Box>
        <JoinCommunity />
      </div>
    </div>
  );
};

export { Home };
