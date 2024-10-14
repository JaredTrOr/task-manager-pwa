import { Injectable } from '@angular/core';
import ListType from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListTypeService {

  listTypeExampleArray : ListType[] = [
    {
      titleList: 'Trabajo',
      emoji: '💻'
    }
  ];

  constructor() { }

  createListType(listType: ListType): void {
    this.listTypeExampleArray.push(listType);

    //Call to API
  }

  getListType(): ListType[] {
    return this.listTypeExampleArray;
  }

  getNewListType(): ListType {
    return {
      titleList: '',
      emoji: '😄'
    }
  }
  
}
