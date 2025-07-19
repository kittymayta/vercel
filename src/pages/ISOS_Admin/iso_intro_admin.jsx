import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import Titulo from "../ISOS_Admin/components/titulo_intro";
import Descripcion from "../ISOS_Admin/components/descripcion_intro";
import Video from "../ISOS_Admin/components/video_intro";
import ImagenCarru from "../ISOS_Admin/components/imagen_intro";
import Image from "./components/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import useCRUD from "@/hooks/useCrud";
import ModalNuevaImagen from "./components/NuevaImagen";

const Iso9000IntroAdmin = () => { 
  const router = useRouter(); 
  const { iso } = router.query; 
  const {get} = useCRUD();
  const [isEditing, setIsEditing]=useState(false)
  const [selectImage, setSelectedImage]=useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [isoCompleta, setIsoCompleta] = useState(null);
  const imagesPerPage = 3;

  useEffect(() => {
    if (iso) {
      fetchIsoData(iso);
      fetchImagenes(iso);
    }
  }, [iso]);

  const handleImageChange = (imagen) =>{
    setSelectedImage(imagen);
    setIsEditing(true);
  }

  const fetchIsoData = async (iso) => {
    try {
      const response = await get(`normasIso/${iso}`);
      setIsoCompleta(response);
      console.log("Iso: ", isoCompleta)
    } catch (error) {
      console.error("Error al recuperar la ISO:", error);
    }
  };
  const fetchImagenes = async (iso) => {
    try {
      const response = await get(`file/obtenerImagenes/${iso}`);
      setImagenes(response);
    } catch (error) {
      console.error("Error al recuperar la ISO:", error);
    }
  };

  const currentImages = images.slice(currentIndex, currentIndex + imagesPerPage);

  const image = {
    link: "/images/ejemplo1.jpg",
    descripcion: "Reuniones Matutinas",
  }
  const image2 = {
    link: "/images/ejemplo2.jpeg",
    descripcion: "Nuestro Equipo",
  }
  const image4 = {
    link: "/images/ejemplo4.jpeg",
    descripcion: "Conferencias",
  }
  const image5 = {
    link: "/images/ejemplo5.jpg",
    descripcion: "Auditorias",
  }

  return (
      <div className="text-black w-full">
        <div className="flex flex-col justify-center items-center">
        {isoCompleta ? ( 
            <>
              <Titulo iso={isoCompleta}/>
              <Descripcion iso={isoCompleta}/>
              <Video iso={isoCompleta}/>
            </>
          ) : (
            <p>Cargando datos de la ISO...</p> 
          )}
        </div>

        <div className="my-4 flex justify-center">
        </div>
        <div className="w-full flex items-center justify-center">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent className="ml-1">
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image imagen={image}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image imagen={image2}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image imagen={image4}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image imagen={image5}/>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
  );
};

export default Iso9000IntroAdmin;