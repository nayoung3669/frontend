import { useState } from "react";
import Post from "../../components/post/Post";
import { useNavigate } from "react-router-dom";
import {
  usePostQuery,
  useLikePostMutation,
  useDeletePostMutation,
} from "../../hooks/apis/usePostQuery";
import Swal from "sweetalert2";
import theme from "../../lib/styles/theme";

const PostContainer = ({ postId }) => {
  const navigate = useNavigate();
  const [onSelected, setOnSelected] = useState(false);
  const { data, isLoading, isError } = usePostQuery(postId);
  const deleteMutate = useDeletePostMutation();
  const likeMutate = useLikePostMutation();

  console.log(data);

  const onClickToUpdate = () => {
    navigate(`/edit/${postId}`);
  };

  const onClickToDelete = () => {
    Swal.fire({
      title: "게시물을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: `${theme.primaryColor}`,
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소하기",
      customClass: {
        popup: "my-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "삭제 완료",
          text: "게시물 삭제가 성공적으로 완료되었습니다.",
          icon: "success",
          confirmButtonColor: `${theme.primaryColor}`,
          customClass: {
            popup: "my-popup",
          },
        });
        deleteMutate(postId);
        navigate("/");
      }
    });
  };

  const onToggleSelected = () => {
    setOnSelected(!onSelected);
  };

  const onLikePost = (e) => {
    e.preventDefault();
    console.log(postId);
    likeMutate(postId);
  };

  if (isError) return <h3>ERROR!</h3>;
  if (isLoading) return <h3>ERROR!</h3>;

  return (
    <Post
      post={data.data}
      onSelected={onSelected}
      onToggleSelected={onToggleSelected}
      onClickToUpdate={onClickToUpdate}
      onClickToDelete={onClickToDelete}
      onLikePost={onLikePost}
    />
  );
};

export default PostContainer;
