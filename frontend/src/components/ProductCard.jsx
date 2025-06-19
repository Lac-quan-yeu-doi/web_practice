import { useState } from 'react';
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Heading, Image, Text, HStack, IconButton, Button, VStack, Input} from "@chakra-ui/react";
import { useColorModeValue, useToast,  useDisclosure } from "@chakra-ui/react";
import { useProductsStore } from '../store/products.js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const ProductCard = ({product}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  
  // Store
  const {deleteProduct, updateProduct} = useProductsStore();
  // Toast for notifications  
  const toast = useToast();
  // Modal for dialog
  // useDisclosure is a hook that provides the state and functions to control the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle product
  const handleDeleteProduct = async (productID) => {
    const {success, message} = await deleteProduct(productID);
    if (success) {
      toast({
        title: 'Product deleted',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error deleting product',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } 
  }
  const handleUpdateProduct = async (productID, updatedProduct) => {
    const {success, message} = await updateProduct(productID, updatedProduct);
    if (success) {
      toast({
        title: 'Product updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error updating product',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose(); // Close the modal after updating
  }

  // useColorModeValue(lightValue, darkValue), use lightValue in light mode and darkValue in dark mode
  const textColor = useColorModeValue('gray.600', 'gray.200'); 
  const bg = useColorModeValue('white', 'gray.600');

  return (
    <Box 
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme="blue" />
                <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
            </HStack>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <Input 
                      placeholder='Product Name' 
                      value={updatedProduct.name}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}/>
                    <Input 
                      placeholder='Product Price' 
                      value={updatedProduct.price} 
                      type='number' 
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}/>
                    <Input 
                      placeholder='Product Image URL' 
                      value={updatedProduct.image} 
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}/>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => {
                    handleUpdateProduct(product._id, updatedProduct)}}>
                    Save
                  </Button>
                  <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </Box>

        
    </Box>
  )
}

export default ProductCard;