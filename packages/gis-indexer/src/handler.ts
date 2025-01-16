import axios from 'axios';
import GISRequest from '@arcgis/core/request.js';

export async function handler(): Promise<void> {
  console.log(GISRequest);
}
