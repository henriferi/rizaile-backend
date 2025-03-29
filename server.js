import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/produtos", async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos"})
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});


app.post("/produtos", async (req, res) => {
    try {
      const { nome, descricao, preco, categoria, imagemUrl, cor, tamanho } = req.body;
  
      const novoProduto = await prisma.produto.create({
        data: {
          nome,
          descricao,
          preco,
          categoria,
          imagemUrl,
          cor,
          tamanho,
        },
      });
  
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  });
  
  

app.put("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, categoria, imagemUrl, cor, tamanho } = req.body;

        const produtoAtualizado = await prisma.produto.update({
            where: { id },
            data: { nome, descricao, preco, categoria, imagemUrl, cor, tamanho},
        });
        
        res.json(produtoAtualizado);
    } catch (error) {
        res.status(500).json({error: "Erro ao atualizar produto"});
    }
});


app.delete("produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.produto.delete({
            where: { id },
        });

        res.json({message: "Produto removido com sucesso"});
    } catch(error) {
        res.status(500).json({error: "Erro ao excluir produto"});
    }
});

