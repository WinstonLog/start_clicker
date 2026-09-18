// ============================================================
// КОНФИГ
// ============================================================
const SUPABASE_URL = "https://eixtvvioqolqeveellvn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeHR2dmlvcW9scWV2ZWVsbHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMzAzODksImV4cCI6MjA5NDkwNjM4OX0.MIfQwCRudKNMBirDvIluxxFoFZtYeCpHmxgY-cHHrL4";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const state = {
    playerId: null,
    name: null,
    token: null,
    data: {}
};