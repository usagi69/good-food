import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8b-gjQEJIy6OhdDfkaJ2hwYWfp85_WoQ",
  authDomain: "good-food-8346b.firebaseapp.com",
  databaseURL: "https://good-food-8346b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "good-food-8346b",
  storageBucket: "good-food-8346b.appspot.com",
  messagingSenderId: "325173425028",
  appId: "1:325173425028:web:f4f59bacdd3b52458963d1"
};
const fire = firebase.initializeApp(firebaseConfig);

const getProducts = async () => {

  const dbRef = fire.database().ref();

  const result = await dbRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().products
    } else {
      console.log("Возникла проблема при получении данных");
    }
  }).catch((error) => {
    console.error(error);
  });

  return result;
};

const setOrder = async (orderData) => {
  fire.database().ref('orders/' + new Date()).set({
    order: orderData,
    time: new Date(),
  })
}

const productsService = {
  getProducts,
  setOrder
};

export default productsService;
