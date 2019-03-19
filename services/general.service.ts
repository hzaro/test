import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class GeneralService {

    constructor(
        public angularFirestore: AngularFirestore,
    ) {
    }

    getAllDocuments(resource) {
        return this.angularFirestore.collection(resource).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
    }

    getAllDocumentsConditional(resource, a, b, c) {
        return this.angularFirestore.collection(resource, ref => ref.where(a, b, c)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
    }

    getDocument(resource,id) {
        return this.angularFirestore.collection(resource).doc(id).snapshotChanges().pipe(
            map(action =>  {
              const data = action.payload.data()
              const id = action.payload.id;
              return { id, ...data };
            }));
    }

    editDocument(resource,id, object) {
        return this.angularFirestore.collection(resource).doc(id).set(
            object
        );
    }

    newDocument(object, name) {
        console.log(name)
        return this.angularFirestore.collection(name).add(
            object
          );
    }

    updateDocument(resource,id, object) {
        return this.angularFirestore.collection(resource).doc(id).update(
            object
        );
    }
}
