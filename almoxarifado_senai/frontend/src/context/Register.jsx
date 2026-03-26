import {Conteiner, Box, TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import {useState} from "react";
import {api} from "../services/Api";
import {useNavigate} from "react-router-dom"

export default function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [setor, serSetor] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () =>{
        if(!name || !email || !setor || !password || !confirmPassword){
            setError("Preencha todos os campos!")
            return;
        }

        if(password !== confirmPassword){
            setError("As senhas não condicidem!");
            return;
        }
    }
}