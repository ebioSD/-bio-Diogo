/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface HealthTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}
