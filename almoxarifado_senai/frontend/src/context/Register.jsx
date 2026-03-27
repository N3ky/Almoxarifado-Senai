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
        try{
            //enviar nome, email, setor e password para o backend
            await api.post("/auth/register", {name, email,setor, password});
            alert("Cadastro realizado com sucesso!");
            navigate("/");
        }catch(err){
            setError(err.response?.data?.msg || "Error ao cadastrar o usuário");
        }
    };

    return(
        <Conteiner
        maxWidth="sm"
        sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            minHeight:"100vh"
        }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding:4,
                    width:"100%",
                    bgcolor:"var(--bg)",
                    border:" 1px solid var(--border)",
                    borderRadius: 2,
                    boxShadow:"var(--shadow)"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb:3,
                        color: "var(--text-h)",
                        fontWeight: 600,
                        textAlign: "center"
                    }}
                >
                    Cadastro
                </Typography> 
                {error &&(
                    <Typography
                        sx={{
                            color:"red",
                            mb:2, 
                            textAlign:"center"
                            }}
                        >
                            {error}
                    </Typography>
                )}
                <Box 
                    component={"form"}  
                    sx={{
                        display: "flex",
                        flexDirection:"column",
                        gap:2
                    }}
                >
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=> setName(e.target.value)}
                        sx={{
                            input: {color:"var(--text)"}
                        }}
                    /> 
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=> setEmail(e.target.value)}
                        sx={{
                            input: {color:"var(--text)"}
                        }}
                    />
                    <TextField
                        select
                        label="Setor"
                        fullWidth
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                        sx={{
                            input: {color:"var(--text)"}
                        }}
                    >
                        <MenuItem value="TI">TI</MenuItem>
                        <MenuItem value="RH">RH</MenuItem>
                        <MenuItem value="Pedagogia">Pedagogia</MenuItem>
                        <MenuItem value="Comercial">Comercial</MenuItem>
                        <MenuItem value="Docente">Docente</MenuItem>
                        <MenuItem value="Almoxarifado">Almoxarifado</MenuItem>
                        <MenuItem value="Gerente">Gerente</MenuItem>        
                </TextField> 
                <TexField
                    label="Conforma Senha"
                    type="password"
                    varient="outlined"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ input: {color:"var(--text)"} }}
                />

                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={handleRegister}
                    sx={{
                        mt:2,
                        bgcolor:"var(--primary",
                        "&:hover": { bgcolor:"var(--primary"}, 

                    }} 
                >
                    Cadastrar 
                </Button>
                </Box>
            </Paper>
        </Conteiner>
    )
}