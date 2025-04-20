// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wjyukyxubxiewubqxngc.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeXVreXh1YnhpZXd1YnF4bmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzA4NTAsImV4cCI6MjA1OTg0Njg1MH0.QgbaD_l97Bcj5gVNvvOjc-RYWMOET21grhyqzrY5BbU'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
