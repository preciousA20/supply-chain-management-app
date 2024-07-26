"use client"
import { useState, useEffect, createContext } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { contractAbi, contractAddress } from "./context/Tracking";
//import { createContext } from "vm";

// function to connect to smart contract 
const fetchContract = (signerOrProvider: any)=>{
    return(
        new ethers.Contract(contractAddress, contractAbi, signerOrProvider)
    )
}
 
export const TrackingContext = createContext({})
 
export const TrackingProvider = ({children}: any)=>{
 
    //state variables
    const dappName: string = "Product Tracking Decentralized Application"
    const [currentUser, setCurrentUser] = useState<string>()

    const createShipment = async(items: any)=>{
        console.log(items)
        const {receiver, pickupTime, distance, price} = items 
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            //console.log("Here is provider", new ethers.providers.Web3Provider(window.ethereum))
            const provider = new ethers.providers.Web3Provider(connection)
            
            const signer = provider.getSigner()
            //const signer = provider.getSigner()
            const contract = fetchContract(signer)

            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18)
                }
            )
            await createItem.wait()
            console.log(createItem)
        } catch (error: any) {
            if(error){
                console.log(error)
            }
        }
    }

     const getAllShipments = async()=>{
        try {
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider)
            const shipments = await contract.getAllTransactions()
            const allShipments = shipments?.map((shipment: any, index: number)=>({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status
            }))
    
            return allShipments;
        } catch (error: any) {
            if(error){
                console.log(error.message)
            }            
        }
     }

     const getShipmentsCount = async()=>{
        let connectedAccount;
        try {
            if(!window.ethereum) return alert("please install metamask")
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            })
            if(accounts.length > 0){
                connectedAccount = accounts[0]
            }
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider)
            const count = await contract.getShipmentCount(connectedAccount)
            const numberCount = count.toNumber()
            return numberCount
        } catch (error: any) {
            if(error){
                console.log("error while getting shipments", error.message)
            }
        }
        
     }


    const completeShipment = async(items: string | number | any)=>{
        console.log(items)
        const {receiver, index} = items 
        try {
            if(!window.ethereum) return alert("Please install metamask")
            let userAccount;
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            })
            if(accounts.length > 0){
                userAccount = accounts[0]
            }

            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = fetchContract(signer)
            const transaction = await contract.completeShipment(
                userAccount,
                receiver,
                index,
                {
                    gasLimit: 300000
                }
            )

            await transaction.wait()
        
        } catch (error: any) {
            if(error){
                console.log(error.message)
            }
        }
    }

    const getShipment = async(index: number)=>{
        console.log(index * 1)
        try {
            if(!window.ethereum) return alert("Install metamask")
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            })

            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider)
            const shipmentsData = await contract.getShipment(
                accounts[0],
                index * 1
            )

            const singleShipment = {
                sender: shipmentsData[0],
                receiver: shipmentsData[1],
                pickupTime: shipmentsData[2].toNumber(),
                deliveryTime: shipmentsData[3].toNumber(),
                distance: shipmentsData[4].toNumber(),
                price: ethers.utils.formatEther(shipmentsData[5].toString()),
                status: shipmentsData[6],
                isPaid: shipmentsData[7]
            }
            return singleShipment;
        } catch (error: any) {
            console.log(error)
        }
    }

    const startShipment = async(getproducts: any)=>{
        const {receiver, index} = getproducts
        try {
            if(!window.ethereum){
               return alert("Install metamast")
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = fetchContract(signer)
            const transaction = await contract.startShipment(
                accounts[0],
                receiver,
                index * 1,
                {
                    gasLimit: 300000
                }
            )
            await transaction.wait()

        } catch (error: any) {
            if(error){
                alert(`Hi Error Here: ${error.message}`)
            }
        }
    }

    //---check wallet connection
    const checkIfWalletConnected = async()=>{
        try {
            if(!window.ethereum) return alert("Install metamask")
            
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            })
            if(accounts.length > 0){
                setCurrentUser(accounts[0])
            }
        } catch (error: any) {
            if(error){
                alert(error.message)
            }            
        }
    }

    const connectWallet = async()=>{
        try {
            if(!window.ethereum) return alert("Install metamask")
            
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            if(accounts.length > 0){
                setCurrentUser(accounts[0])
            }
        } catch (error: any) {
            if(error){
                alert(error.message)
            }            
        }
    }
     

    useEffect(()=>{
        (async function(){
            await checkIfWalletConnected()
        })()
    }, [])

    return(
        <TrackingContext.Provider value={{
            connectWallet,
            createShipment,
            getAllShipments,
            completeShipment,
            getShipment,
            startShipment,
            getShipmentsCount,
            dappName,
            currentUser
        }}>
            {children}
        </TrackingContext.Provider>
    )
}

