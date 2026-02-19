import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { 
    Container, Typography, Card, CardContent, 
    Button, TextField, MenuItem, Select, Stack 
} from "@mui/material";

export type Post = {
    id: string;
    title: string;      
    content: string;    
    author: string;     
    createdAt: string;  
}

export default function PostList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://forum.hansyulian.space/api/post');
            const data = await response.json();
            setPosts(data.records);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredAndSortedPosts = useMemo(() => {
        return posts
            .filter(post => 
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.author.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === "createdAt") {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                return a[sortBy as keyof Post].localeCompare(b[sortBy as keyof Post]);
            });
    }, [posts, search, sortBy]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" mb={3}>Daftar Postingan</Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
                <TextField 
                    label="Cari judul atau penulis" 
                    variant="outlined" 
                    fullWidth 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="title">Judul</MenuItem>
                    <MenuItem value="createdAt">Tanggal</MenuItem>
                    <MenuItem value="author">Penulis</MenuItem>
                </Select>
                <Button variant="outlined" onClick={fetchPosts}>Reload</Button>
            </Stack>

            <Stack spacing={2}>
                {filteredAndSortedPosts.map((post) => (
                    <Card key={post.id} variant="outlined">
                        <CardContent>
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Oleh: {post.author} | {new Date(post.createdAt).toLocaleDateString()}
                            </Typography>
                            <Stack direction="row" mt={2}>
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    Detail
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}
