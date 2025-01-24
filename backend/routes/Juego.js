import express from 'express'
import {GeneradorPartida} from '../Helper/GeneradorPartida.js'
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, addDoc} from 'firebase/firestore/lite'
const router = express.Router()
const firebaseConfig = {
  apiKey: 'AIzaSyBtqukHnVCOE6Wen6dXkOix7kvccelSpBM',
  authDomain: 'fireproject-5bfc4.firebaseapp.com',
  projectId: 'fireproject-5bfc4',
  storageBucket: 'fireproject-5bfc4.firebasestorage.app',
  messagingSenderId: '246177500703',
  appId: '1:246177500703:web:8671e17b70db580b328f2a'
}
const firebaseApp = initializeApp(firebaseConfig)
const dbFirebase = getFirestore(firebaseApp)

//ENDPOINTS

// Leer partidas
router.get('/partidas', async (req, res) => {
  try {
    const documentosColeccion = await getDocs(collection(dbFirebase, 'Partidas'))
    const data = documentosColeccion.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    res.json(data)
  } catch (error) {
    console.error('Error fetching Firestore data:', error)
    res.status(500).send('Error fetching data')
  }
})

// Agregar partida
router.post('/partida', async (req, res) => {
  try {
    //Generar nueva partida
    const partida = GeneradorPartida(JSON.parse(req.body.data.token), req.body.data.idCuestionario)
    console.log(partida) // Mostrar partida en consola
    const resultado = await addDoc(collection(dbFirebase, 'Partidas'), partida)
    res.status(200).json(partida.pin)
  } catch (ex) {
    console.error('Error al insertar en Firestore:', ex.message)
    res.status(500).json({error: ex.message})
  }
})
export default router
