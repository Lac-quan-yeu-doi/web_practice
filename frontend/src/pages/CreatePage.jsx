import { Box, Button, Container, Heading, Input, VStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductsStore } from '../store/products.js';
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '', 
    price: '',
    image: ''
  });

  const {createProduct} = useProductsStore()
  
  const toast = useToast();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct) 
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000, // 3000ms
        isClosable: true,
      });
      return;
    }
    else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: '', price: '', image: '' }); // Reset form
    }
  }
  
  return (
    <Container maxW={'container.md'}>
      <VStack
        spacing={8}
      >
        <Heading as='h1' size='2xl' textAlign='center' mb={8}>
          Create New Product
        </Heading>

        <Box
          w={'full'} bg={useColorModeValue('white', 'gray.800')}
          p={6} rounded={'lg'} shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            /> 
            <Button colorScheme='blue' w='full' onClick={handleAddProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
export default CreatePage;