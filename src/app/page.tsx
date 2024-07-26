"use client"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { TrackingContext } from "./TrackingContext"
import { Table , Form, Service, Profile, CompleteShipment, GetShipment, StartShipment} from "../components"

export default function Home() {
  const {dappName, 
    getAllShipments, 
    currentUser,
    createShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,

  } = useContext(TrackingContext)

  // STATE VARIABLES
  const [createShipmentModel, setCreateShipmentModel] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [startModal, setStartModal] = useState<boolean>(false)
  const [completeModal, setCompleteModal] = useState<boolean>(false)
  const [getModel, setGetModel] = useState<boolean>(false) 

  //DATA STATE
  const [allShipmentsData, setGetAllShipmentsData] = useState<any[]>([])

  useEffect(()=>{
    (async function(){
      const getCampaignsData = await getAllShipments()
      setGetAllShipmentsData(getCampaignsData)
    })()
  },[currentUser])

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //  {dappName}
    // </main>

    <>
      <Service
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />

      <Table 
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsData={allShipmentsData}
      />

      <Form 
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile 
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />

      <CompleteShipment 
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />

      <GetShipment 
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />

      <StartShipment 
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />

    </>
  )
}
