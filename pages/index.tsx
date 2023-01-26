import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";

export interface BlogProps {
  posts: BlogPost[];
}

export interface BlogPost {
  frontMatter: BlogPostMetadata;
  slug: string;
  mdxSource: any;
}

export interface BlogPostMetadata {
  title: string;
  thumbnailUrl: string;
  tags: string[];
  description: string;
  date: string;
}

const Home: NextPage<BlogProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post: BlogPost, index: any) => (
        <Link href={"/posts/" + post.slug} passHref key={index}>
          <div className="card mb-3 pointer" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.frontMatter.title}</h5>
                  <p className="card-text">{post.frontMatter.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {post.frontMatter.date}
                    </small>
                  </p>
                </div>
              </div>
              <div className="col-md-4 m-auto">
                <Image
                  src={post.frontMatter.thumbnailUrl}
                  className="img-fluid mt-1 rounded-start"
                  alt="thumbnail"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    const frontMatterWithDate = JSON.parse(JSON.stringify(frontMatter));
    return {
      frontMatter: frontMatterWithDate,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
};

export default Home;
