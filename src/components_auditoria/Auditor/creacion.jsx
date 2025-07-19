import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import React, { useState, useEffect } from 'react'; 
import useCRUD from '@/hooks/useCrud';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { toast } from "sonner";

const CrearMicroAuditoria = ({auditoria, confirmar, fetchMicros}) => {
    const { get, post, put, eliminar } = useCRUD();
    const [selectedProceso, setSelectedProceso]=useState(null);
    const [selectedItem, setSelectedItem]=useState(null);
    const [selectedSubItem, setSelectedSubItem]=useState(null);
    const [selectedFecha, setSelectedFecha]=useState('');
    const [selectedAuditor, setSelectedAuditor]=useState(null);
    const [procesos, setProcesos]=useState([]);
    const [items, setItems]=useState([]);
    const [subitems, setSubItems]=useState([]);
    const [auditores, setAuditores]=useState([]);

    const fetchProcesos = async() =>{
        try {
          const response = await get(`procesos/entidad/${auditoria.codigoEntidad}`)
          const filtrados = response.filter(proceso=>proceso.estado === "Aprobado");
          setProcesos(filtrados);
          setProcesosFiltrados(filtrados);
        } catch (error) {
          console.log('Error al obtener los procesos de la entidad: ', error);
        }
    }
    const fetchItems = async()=>{
        try {
          const response = await get(`items/listarByCodigoNorma/${auditoria.normaIso.codigoNormaIso}`)
          const filtrado = response.filter(item=>item.estadoUso === true);
          setItems(filtrado);
        } catch (error) {
          console.log('Error al obtener los items de la norma: ', error);
        }
    }
    const fetchSubitems = async()=>{
        try {
          const response = await get(`subItems/listarByCodigoItem/${selectedItem}`)
          const filtrado = response.filter(subItem=>subItem.estadoUso === true);
          setSubItems(filtrado);
        } catch (error) {
          console.log('Error al obtener los subitems del item', error);
        }
    }
    const fetchAuditores = async()=>{
        try {
          const response = await get("usuarios/tipoUsuario/5")
          setAuditores(response);
        } catch (error) {
          console.log('Error al obtener los auditores');
        }
    }

    const nuevaMicro = async()=>{
        const data = {
            auditoria: {
                codigoAuditoria: auditoria.codigoAuditoria,
            },
            fechaAuditar: selectedFecha,
            subItem: {
                codigoSubItem: selectedSubItem,
            },
            proceso: {
                codigoProceso: selectedProceso,
            },
            usuario: {
                codigoUsuario: selectedAuditor
            },
        }
        console.log("DATA:", data);
        try {
            await post("microAuditoria/create", data)
            console.log("Auditoria-Proceso creada exitosamente")
            toast.success("Auditoria-Proceso creada exitosamente")
            confirmar();
            fetchMicros();
        } catch (error) {
            console.log("Error al crear la Auditoria-Proceso: ", error)
            toast.error("Error al crear la Auditoria-Proceso");
        }
    }

    useEffect(() => {
        fetchProcesos();
        fetchItems();
        fetchAuditores();
    }, []);
    useEffect(() => {
        fetchSubitems();;
    }, [selectedItem]);


    return (
        <div className="flex flex-col h-full items-start p-6 w-full space-y-4">
            <div className="mb-4 flex align-middle justify-center items-center w-full">
                <h1 className="text-xl font-bold">Crear Auditoría - Proceso</h1>
            </div>
                <div className="flex items-center align-middle justify-center">
                    <label className="block font-bold mr-4">Proceso:</label>
                    <Select onValueChange={(value)=>setSelectedProceso(value)}>
                        <SelectTrigger className="w-[470px]">
                            <SelectValue placeholder="Proceso a auditar." />
                        </SelectTrigger>
                        <SelectContent className="w-[470px]">
                            <SelectGroup>
                                <SelectLabel>Procesos</SelectLabel>
                                {procesos.map((proceso)=>(
                                    <SelectItem key={proceso.codigoProceso} value={proceso.codigoProceso}>{proceso.nombre}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center">
                    <label className="block font-bold mr-4">Ítem:</label>
                    <Select onValueChange={(value)=>setSelectedItem(value)}>
                        <SelectTrigger className="w-[470px] ml-8">
                            <SelectValue placeholder="Item de la norma." />
                        </SelectTrigger>
                        <SelectContent className="w-[470px]">
                            <SelectGroup>
                                <SelectLabel>Items</SelectLabel>
                                {items.map((item)=>(
                                    <SelectItem key={item.codigoItem} value={item.codigoItem}>{item.nombreItem}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                    {selectedItem && 
                        <div className="flex items-center">
                            <label className="block font-bold mr-4">SubItem:</label>
                            <Select onValueChange={(value)=>setSelectedSubItem(value)}>
                                <SelectTrigger className="w-[470px]">
                                    <SelectValue placeholder="Subitem correspondiente." />
                                </SelectTrigger>
                                <SelectContent className="w-[470px]">
                                    <SelectGroup>
                                        <SelectLabel>SubItems</SelectLabel>
                                        {subitems.map((subitem)=>(
                                            <SelectItem key={subitem.codigoSubItem} value={subitem.codigoSubItem}>{subitem.nombreSubItem}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    }
                <div className="flex items-center">
                    <label className="block font-bold mr-4">Fecha y Hora:</label>
                    <input type="datetime-local" className="border border-gray-300 rounded-lg p-2 w-full" value={selectedFecha} onChange={(e) => setSelectedFecha(e.target.value)}/>
                </div>
                <div className="flex items-center">
                    <label className="block font-bold mr-4">Auditor:</label>
                    <Select onValueChange={(value)=>setSelectedAuditor(value)}>
                        <SelectTrigger className="w-[470px] ml-3">
                            <SelectValue placeholder="Auditor." />
                        </SelectTrigger>
                        <SelectContent className="w-[470px]">
                            <SelectGroup>
                                <SelectLabel>Auditores</SelectLabel>
                                {auditores.map((auditor)=>(
                                    <SelectItem key={auditor.codigoUsuario} value={auditor.codigoUsuario}>{auditor.nombreUsuario} {auditor.apellidoPat} {auditor.apellidoMat}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            <div className="space-x-4 w-full flex justify-center">
                <ButtonBlue className="px-8" onClick={()=>nuevaMicro()}>Guardar</ButtonBlue>
                <ButtonGray className="px-8">Cancelar</ButtonGray>
            </div>
        </div>
    );
}

export default CrearMicroAuditoria;