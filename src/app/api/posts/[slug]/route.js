// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

// // GET SINGLE POST
// export const GET = async (req, { params }) => {
//   const { slug } = params;

//   try {
//     const post = await prisma.post.update({
//       where: { slug },
//       data: { views: { increment: 1 } },
//       include: { user: true },
//     });

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };




import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

//  GET SINGLE POST (existing)
export const GET = async (req, { params }) => {
  const { slug } = params;
  
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

//  UPDATE POST 
export const PUT = async (req, { params }) => {
  const { slug } = params;
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // Optional: verify post belongs to current user before update
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      include: { user: true },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    if (existingPost.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized to update this post!" }),
        { status: 403 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title: body.title || existingPost.title,
        desc: body.desc || existingPost.desc,
        img: body.img || existingPost.img,
        catSlug: body.catSlug || existingPost.catSlug,
        level: body.level || existingPost.level,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong while updating!" }),
      { status: 500 }
    );
  }
};

//  DELETE POST (new)
export const DELETE = async (req, { params }) => {
  const { slug } = params;
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    // Check post ownership
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    if (existingPost.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized to delete this post!" }),
        { status: 403 }
      );
    }

    await prisma.post.delete({ where: { slug } });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong while deleting!" }),
      { status: 500 }
    );
  }
};
