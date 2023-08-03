// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { Flex } from './components/Flex'
import { Grid } from './components/Grid'
import { Item } from './components/Item'
import { CustomText } from './components/CustomText'
import { CustomButton } from './components/CustomButton'
import { CustomInput } from './components/CustomInput'
import { PopUp } from './components/PopUp'

function App() {
   const SERVERURL = null;
   const [createData, setCreateData] = useState({ login: '', password: '' })
   const [notes, setNotes] = useState([])
   const [variableForUpdateDataFromServer, setVariableForUpdateDataFromServer] = useState(null)
   const [userID, setUserID] = useState(null)
   const [loginData, setLoginData] = useState(null)
   const [showPopUp, setShowPopUp] = useState(0)
   const [possibleError, setPossibleError] = useState(null)

   useEffect(() => {
      if (!userID) {
         return
      }
      fetch(`${SERVERURL}/api?id=${userID}`, {
         method: 'GET',
         headers: {
            'Accept': "application/json"
         }
      })
         .then(res => res.json())
         .then(data => {
            setNotes(data)
         })
      console.log(notes)
   }, [variableForUpdateDataFromServer])

   const handleDeleteClick = (deleteIndex) => {
      try {
         fetch(`${SERVERURL}/api`, {
            method: "DELETE",
            headers: {
               'Accept': "application/json",
               'Content-Type': "application/json"
            },
            body: JSON.stringify({ 'index': deleteIndex })
         })
            .then(res => res.json())
            .then(data => {
               setNotes(data)
               setVariableForUpdateDataFromServer(Math.random())
            })
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='bg-bg h-screen'>
         <div className='py-14 max-w-7xl flex mx-auto flex-col h-full relative'>
            <PopUp addition={`max-w-200px ${showPopUp ? 'top-inv100 invisible opacity-0' : 'top-1/2'}`}>
               <CustomText addition={`text-center  mb-5 w-full`}>{possibleError ? possibleError : ''}</CustomText>
               <Flex addition='mb-5 flex-col w-full'>
                  <CustomInput
                     addition={`w-full`}
                     onInput={(event) => {
                        setLoginData({
                           ...loginData,
                           login: event.target.value
                        })
                     }}
                     placeholder='Login' />
                  <CustomInput
                     addition={`w-full`}
                     onInput={(event) => {
                        setLoginData({
                           ...loginData,
                           password: event.target.value
                        })
                     }}
                     placeholder='Password' />
                  <Flex addition='justify-between w-full'>
                     <CustomButton
                        onClick={async () => {
                           if (!loginData.login || !loginData.password) {
                              return
                           }
                           await fetch(`${SERVERURL}/register`, {
                              method: 'POST',
                              headers: {
                                 'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(loginData)
                           })
                              .then(data => data.json())
                              .then(res => {
                                 if (res.err) {
                                    setPossibleError('User already exist')
                                 } else {
                                    setUserID(res)
                                    setShowPopUp(!showPopUp)
                                    setVariableForUpdateDataFromServer(Math.random())
                                 }
                              })
                        }}
                     >Sign up</CustomButton>
                     <CustomButton
                        onClick={async () => {
                           if (loginData?.login == null || loginData?.password == null || (loginData == null)) {
                              return
                           }
                           await fetch(`${SERVERURL}/login?login=${loginData.login}&password=${loginData.password}`, {
                              method: 'GET',
                              headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': "application/json"
                              },
                           })
                              .then(res => res.json())
                              .then(data => {
                                 if (data.err) {
                                    setPossibleError(data.err)
                                 } else {
                                    setUserID(data)
                                    setShowPopUp(!showPopUp)
                                    setVariableForUpdateDataFromServer(Math.random())
                                 }
                              })
                        }}
                     >Sign in</CustomButton>
                  </Flex>
               </Flex>
            </PopUp>
            <Flex addition={`mb-5 visible transition-all duration-300 flex-col items-start w-full ${!showPopUp ? 'invisible opacity-0' : ''}`}>
               <CustomText>Add Note:</CustomText>
               <Flex addition='flex-col'>
                  <CustomInput
                     onInput={(e) => {
                        setCreateData({
                           ...createData,
                           login: e.target.value || ''
                        })
                     }}
                     value={createData?.login || ''}
                     placeholder='Write your login'></CustomInput>
                  <CustomInput
                     onInput={(e) => {
                        setCreateData({
                           ...createData,
                           password: e.target.value || ''
                        })
                     }}
                     value={createData?.password || ''}
                     placeholder='White your password'></CustomInput>
                  <CustomButton addition={'mr-auto'}
                     onClick={async () => {
                        try {
                           console.log(createData)
                           await fetch(`${SERVERURL}/api`, {
                              method: 'POST',
                              headers: {
                                 'Accept': "application/json",
                                 'Content-Type': "application/json"
                              },
                              body: JSON.stringify({ login: createData.login, password: createData.password, id: userID })
                           })
                           setVariableForUpdateDataFromServer(Math.random())
                        } catch (err) {
                           console.log(err)
                        }

                     }}
                  >Submit</CustomButton>
               </Flex>
            </Flex>
            <Grid addition={`visible transition-all duration-300 ${!showPopUp ? 'invisible opacity-0' : ''}`}>
               {notes.map((item, index) => {
                  return (
                     <Item key={index}>
                        <Flex addition={'flex-col w-full gap-x-2 gap-0 mt-auto h-full'}>
                           <CustomText addition=''>{item.login}</CustomText>
                           <CustomText addition=''>{item.password}</CustomText>
                           <Flex addition={'justify-between w-full mt-auto'}>
                              <CustomButton addition='ml-auto '
                                 onClick={() => {
                                    handleDeleteClick(index)
                                 }}
                              >Delete</CustomButton>
                           </Flex>
                        </Flex>
                     </Item>
                  )
               })}
            </Grid>
         </div>
      </div>
   )
}

export default App
