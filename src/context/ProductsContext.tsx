import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type Products = {
  _id: string;
  product: string;
  price: number;
  image:{
    name:string,
    data:Buffer
  },
  user_id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}[];

export interface ProductContext {
  products: Products;
  setProducts: Dispatch<SetStateAction<Products>>;
  product: string;
  setProduct: Dispatch<SetStateAction<string>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  image: FileList | null;
  setImage: Dispatch<SetStateAction<FileList | null>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  addProduct: () => void;
  deleteProduct: (id: string) => void;
}

const defaultState = {
  products: [],
  setProducts: (products: Products) => {},
  product: "",
  setProduct: (product: string) => {},
  price: "",
  setPrice: (price: string) => {},
  image: null,
  setImage: (image: FileList | null) => {},
  message: "",
  setMessage: (message: string) => {},
  addProduct: () => {},
  deleteProduct: (id: string) => {}
} as ProductContext;

export const myProductContext = createContext(defaultState);

type productProvideProps = {
  children: ReactNode;
};

export default function ProductsContext({ children }: productProvideProps) {
    const [products, setProducts] = useState<Products>([]);
    const [product, setProduct] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [image, setImage] = useState<FileList | null>(null);
    const [message, setMessage] = useState("");

    //get products from the server using RESTFulAPI
    const getProducts = async () => {
        const url: string = "http://localhost:2000/products";
        try
        {
            const response: Response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        }
        catch (err)
        {
            console.log(err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    //add new product 
    const addProduct = async () => {
        const data = new FormData()
        data.append('product', product);
        data.append('price', price);
        data.append('user_id', '654bc72dd06aa16c1a6f4a48');
        
        if (image !== null && image.length > 0) {
            data.append('product_img', image[0]);
        }

        const url: string = "http://localhost:2000/products/store";
        try
        {
            const response: Response = await fetch(url, {
              method: "POST",
              body: data
            });
            if (response.ok) {
                const resMessage = await response.json();
                setMessage(resMessage.message);
            }
        }
        catch (err)
        {
            console.log(err);
        }
    };

    //delete product
    const deleteProduct = async (id: string) => {
        const url: string = `http://localhost:2000/products/${id}/destroy`;
        try
        {
            const response: Response = await fetch(url, {
                method:'DELETE'
            });
            if (response.ok)
            {
                const resMessage = await response.json();
                console.log(resMessage);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return (
    <myProductContext.Provider
      value={{
        products,
        setProducts,
        product,
        setProduct,
        price,
        setPrice,
        image,
        setImage,
        message,
        setMessage,
        addProduct,
        deleteProduct
      }}
    >
      {children}
    </myProductContext.Provider>
  );
}
