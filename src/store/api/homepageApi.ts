import { baseApi } from "./baseApi";

export const homepageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Hero Section
    getHeroSection: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/hero-section/",
      providesTags: ["HeroSection"],
    }),
    updateHeroSection: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/hero-section/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["HeroSection"],
    }),

    // About Us Section
    getAboutUs: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/about-us/",
      providesTags: ["AboutUs"],
    }),
    updateAboutUs: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/about-us/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    // Features Section
    getFeatures: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/features/",
      providesTags: ["Features"],
    }),
    updateFeatures: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/features/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Features"],
    }),

    // Counts Section
    getCounts: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/counts/",
      providesTags: ["Counts"],
    }),
    updateCounts: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/counts/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Counts"],
    }),

    // Intro Video Section
    getIntroVideo: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/intro-video/",
      providesTags: ["IntroVideo"],
    }),
    updateIntroVideo: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/intro-video/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["IntroVideo"],
    }),

    // Chef Expertise Section
    getChefExperties: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/chef-experties/",
      providesTags: ["ChefExperties"],
    }),
    updateChefExperties: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/chef-experties/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ChefExperties"],
    }),

    // Top Menu (Special Dishes)
    getTopMenu: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/top-menu/",
      providesTags: ["TopMenu"],
    }),
    updateTopMenu: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/top-menu/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TopMenu"],
    }),

    // Top Reviews
    getTopReviews: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/top-reviews/",
      providesTags: ["TopReviews"],
    }),
    updateTopReviews: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/top-reviews/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TopReviews"],
    }),

    // Top Blogs
    getTopBlogs: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/top-blogs/",
      providesTags: ["TopBlogs"],
    }),
    updateTopBlogs: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/top-blogs/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TopBlogs"],
    }),

    // Contact Info & Navbar
    getContactInfo: builder.query<any, void>({
      query: () => "/api/v1/restaurant/homepage/contact-info/",
      providesTags: ["ContactInfo"],
    }),
    updateContactInfo: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/restaurant/homepage/contact-info/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ContactInfo"],
    }),
  }),
});

export const {
  useGetHeroSectionQuery,
  useUpdateHeroSectionMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useGetFeaturesQuery,
  useUpdateFeaturesMutation,
  useGetCountsQuery,
  useUpdateCountsMutation,
  useGetIntroVideoQuery,
  useUpdateIntroVideoMutation,
  useGetChefExpertiesQuery,
  useUpdateChefExpertiesMutation,
  useGetTopMenuQuery,
  useUpdateTopMenuMutation,
  useGetTopReviewsQuery,
  useUpdateTopReviewsMutation,
  useGetTopBlogsQuery,
  useUpdateTopBlogsMutation,
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
} = homepageApi;
