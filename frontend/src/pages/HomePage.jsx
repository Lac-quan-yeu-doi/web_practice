import {Container, VStack, Heading, Text, Link, SimpleGrid} from '@chakra-ui/react';
import { useProductsStore } from '../store/products.js';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const HomePage = () => {
  const {fetchProducts, products} = useProductsStore();

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
  }, [fetchProducts]);
  console.log('products: ', products); // products is an array

  return (  
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6}>
        <Text 
          fontSize="30"
          fontWeight="bold"
          textAlign="center"
          bgGradient={"linear(to-r, #7928CA, #FF0080)"}
          bgClip={"text"}
        >
          CURRENT PRODUCTS
        </Text>
        
        <SimpleGrid
          columns={{
            base: 1, // base screen size => 1 column
            sm: 2, // small screen size => 2 columns
            md: 3, // medium screen size => 3 columns
            lg: 4, // large screen size => 4 columns
            xl: 5 // extra large screen size => 5 columns
          }}
          spacing={10}
          w={'4 xl'}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>
       
        {/* // JSX allows embeding JS code by using {} */}
        {products.length === 0 && (
          <Text
            fontSize="xl"
            fontWeight={'bold'}
            textAlign="center"
            color="gray.400"
          >
            No product available.
              <Link href='/create'>
                <Text 
                  as="span" 
                  color=" rgb(210, 38, 241)"
                  textDecoration="underline"
                  _hover={{ textDecoration: 'underline', color: 'pink.500' }}
                >
                  Add a new product
                </Text>
              </Link>   
          </Text>
        )}

      </VStack>
    </Container>
  );
}
export default HomePage;