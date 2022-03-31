import { useState, useEffect, useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

export const useFireStore = (collection) => {
  let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
  };
  const firestoreReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
      case "IS_PENDING":
        return { isPending: true, document: null, error: null, success: false };
      case "ADDED_DOCUMENT":
        return {
          ...state,
          isPending: false,
          document: action.payload,
          success: true,
          error: null,
        };
      case "DELETED_DOCUMENT":
        return {
          isPending: false,
          document: action.payload,
          error: null,
          success: true,
        };
      case "ERROR":
        return {
          isPending: false,
          document: null,
          error: action.payload,
          success: false,
        };
    }
  };
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a doc
  const addDocument = async (doc) => {
    //idk
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  // delete a doc
  const deleteDocument = async (doc) => {
    //idk
    dispatch({ type: "IS_PENDING" });

    try {
      const deletedDocument = await ref.doc(doc.id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "Could not load data :(",
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { addDocument, deleteDocument, response };
};
