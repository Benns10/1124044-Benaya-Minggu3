import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

// Export tipe data supaya bisa di-import di Test.tsx
export type Post = {
    id: string;
    title: string;      
    content: string;    
    author: string;     
    createdAt: string;  

}

const navigate = useNavigate();
const gotToPost = (id: string ) => {
    navigate(`/post/${id}`);
}
export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [sortBy, setSortBy] = useState<string>();
    const [isSortAscending, setIsSortAscending] = useState<boolean>(true); 
    const sortedPost = useMemo(() => {
        
    }, [posts, sortBy, isSortAscending]);

    useEffect(() => {
        async function reloadPosts() {
            // Gunakan try-catch agar lebih aman
            try {
                const response = await fetch('http://localhost:5173/api/post');
                if (response.status !== 200) {
                    alert("fail to reload post");
                    return;
                }
                const data = await response.json();

                const sortedPosts = data.records.sort((a: Post, b: Post) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        }
        reloadPosts();
    }, []);

    return (
        <div>
            <button onClick={(reloadPost)}>reload</button>
            {posts.map(record =>
            <div key={record.id}>
                    {record.title}
                    {}
                    <button onClick={() => 
                        gotToPost(record.id)
                    }>detail
                    </button>
                    {}
                </div>)
            }
        </div>
        // <div style={{ padding: '20px' }}>
        //     <h2>Daftar Postingan</h2>
            
        //     {posts.length === 0 ? (
        //         <p>Tidak ada postingan untuk ditampilkan.</p>
        //     ) : (
        //             posts.map((post) => (
        //             <div key={post.id} style={{ 
        //                 border: '1px solid black', 
        //                 marginBottom: '10px', 
        //                 padding: '10px' 
        //             }}>
        //                 <h3>{post.title}</h3>
        //                 <p><strong>Penulis:</strong> {post.author}</p>
        //                 <p>{post.content}</p>
        //                 <button onClick={() => alert('ID Post: ${post.id}')}>
        //                     Lihat Detail
        //                 </button>
        //             </div>
        //         ))
        //     )}
        // </div>
    )
}