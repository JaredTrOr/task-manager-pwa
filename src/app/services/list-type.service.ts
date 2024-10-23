import { Injectable } from '@angular/core';
import ListType from '../models/list.interface';
import { HttpClient } from '@angular/common/http';
import ApiResponse from '../models/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ListTypeService {

  private URL = 'http://localhost:3000/list-type';
  listTypeArray: ListType[] = [];

  constructor(
    private http: HttpClient
  ) { }

  // Http requests
  getListsTypes() {
    return this.http.get<ApiResponse<ListType[]>>(`${this.URL}/get-list-types`);
  }

  createListType(listType: ListType) {
    return this.http.post<ApiResponse<ListType>>(`${this.URL}/create-list-type`, listType);
  }

  deleteListType(id: string) {
    return this.http.delete<ApiResponse<null>>(`${this.URL}/delete-list-type/${id}`);
  }

  //Handle list type array
  pushListType(listType: ListType) {
    this.listTypeArray.push(listType);
  }

  removeListType(index: number) {
    this.listTypeArray.splice(index,1);
  }

  getListTypeArray(): ListType[] {
    return this.listTypeArray;
  }

  setListTypeArray(listTypeArray: ListType[]) {
    this.listTypeArray = listTypeArray;
  }

  getNewListType(): ListType {
    return {
      title: '',
      emoji: '😄'
    }
  }
  
}
