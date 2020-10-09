import React from "react"
import classes from "./Features.module.css"

export default function Features() {
  const features = [
    {
      content: "PostgreSQL/MySQL/MariaDB/MongoDB and much more!",
      image: `/img/features/undraw_server_status_5pbv.svg`,
      title: "SQL/NoSQL",
    },
    {
      content:
        "Everything is automatically cached using Redis for optimal performance and speed!",
      image: `/img/features/undraw_speed_test_wxl0.svg`,
      title: "Redis",
    },
    {
      content:
        "English/Arabic & RTL/LTR and we will be more than happy to add your language!",
      image: `/img/features/undraw_around_the_world_v9nu.svg`,
      title: "i18n & RTL",
    },
    {
      content:
        "Visual Access Control List builder, create your complex ACL per content type.",
      image: `/img/features/undraw_subscriptions_1xdv.svg`,
      title: "ACL",
    },
    {
      content: "Out of the box user management with roles and capabilities.",
      image: `/img/features/undraw_add_user_ipe3.svg`,
      title: "Users/Roles/Capabilities",
    },
    {
      content:
        "One language JavaScript, the frontend uses React and the backend uses Node.js",
      image: `/img/features/undraw_web_developer_p3e5.svg`,
      title: "One Language!",
    },
    {
      content:
        "Don't worry about brute force and other attacks, we took care of them!",
      image: `/img/features/undraw_secure_server_s9u8.svg`,
      title: "Secure!",
    },
    {
      content:
        "Aventum extends easily using a WordPress like extensions system!",
      image: `/img/features/undraw_add_content_d1tf.svg`,
      title: "Extendability!",
    },
    {
      content: "Completely free and open source!",
      image: `/img/features/undraw_open_source_1qxw.svg`,
      title: "MIT",
    },
    // {
    //   content: 'Everything done visually and Aventum will handle the hard work behind the scenes',
    //   image: `/img/features/undraw_abstract_x68e.svg`,
    //
    //   title: '~~NO CLI~~',
    // },
  ]

  return (
    <div className="p-5 md:p-16 max-w-screen-xl">
      <div className={`p-8 flex flex-wrap ${classes.FeaturesWrapper}`}>
        {features.map(feature => {
          return (
            <div
              key={feature.title}
              className="flex flex-col justify-center w-full md:w-2/6 p-6 items-center text-center"
            >
              <img className="w-2/5" src={feature.image} alt="Aventum Logo" />
              <h3 className="font-bold mb-3 mt-6 text-brand-red">
                {feature.title}
              </h3>
              <p>{feature.content}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
