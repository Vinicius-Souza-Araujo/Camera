import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 


import * as MediaLibrary from 'expo-media-library';



export default function TelaCamera({ navigation }){
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [permissao, setPermissao] = useState(null);
    const [fotoCapturada, setFotoCapturada] = useState(null);
    const [open, setOpen] = useState(false);
    const [status, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() =>{
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermissao(status === 'granted');
        })();

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            requestPermission(status === 'granted');
        })();

    }, [])

    if(permissao === null){
        return<View />;
    }

    if(permissao === false){
        return<Text>Acesso negado!</Text>;
    }

    async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setFotoCapturada(data.uri);
            setOpen(true);
            console.log(data);
        }
    }

    async function  savePicture(){
        const asset = await MediaLibrary.createAssetAsync(fotoCapturada)
        .then(()=>{
            alert('Foto salvada com sucesso!')
        })
        .catch(error =>{
            console.log('err', error);
        })
    }
    return(
        <View style={{flex: 1,width: "100%", height: "100%", backgroundColor:"#004aad"}}>
            <Camera
            type={type}
            ref={camRef}
            >
            
           
            <View style={{width: "100%", height: "88%"   }}>
            
            
            </View>
            <TouchableOpacity
            style={{
                 backgroundColor : "transparent",
                 alignItems : "flex-start",
                 marginLeft: 10,
                 
                
                }}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Fontisto name="spinner-refresh" size={24} color="#004aad" />
          </TouchableOpacity>
            </Camera>

            <TouchableOpacity
            style={{
                 backgroundColor : "#004AAD",
                 padding: 15,
                 alignItems : "center",
                 
                
                }}
            onPress={takePicture}>
            <FontAwesome name="camera" size={25} color="#FFFFFF" />
          </TouchableOpacity>
           
           {fotoCapturada &&
            <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            >

                
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <View style={{flexDirection:"row", }}>
                    <TouchableOpacity style={{margin:10, alignItems : "center"}} onPress={()=> setOpen(false)}>
                        <FontAwesome name="window-close" size={50} color="#FF0000"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{margin:10, alignItems : "center"}} onPress={savePicture}>
                        <FontAwesome name="upload" size={50} color="#77dd77"/>
                    </TouchableOpacity>
                    </View>

               
                <Image
                    
                    style={{ width: "100%", height:450 }}
                    source={{uri: fotoCapturada}}
                />
             </View>
            </Modal>
           }
        </View>
    );
}