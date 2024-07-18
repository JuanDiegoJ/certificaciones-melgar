import { initialData } from "./seed";
import prisma from '../lib/prisma'

async function main() {

    // 1. Borrar registros previos
    // await Promise.all( [
    await prisma.usuarios.deleteMany();
  
    // ]);
    
    const { usuarios } = initialData;
  
  
    await prisma.usuarios.createMany({
      data: usuarios
    });
    
  }
  
  
  
  
  
  
  
  
  
  ( () => {
  
    if ( process.env.NODE_ENV === 'production' ) return;
  
  
    main();
  } )();