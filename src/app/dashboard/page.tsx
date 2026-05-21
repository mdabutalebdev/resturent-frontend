"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
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
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
} from "@/store/api/homepageApi";

type TabName = "hero" | "about" | "features" | "counts" | "video" | "chefs" | "contact";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabName>("hero");

  // RTK Queries
  const { data: heroData, isLoading: loadingHero } = useGetHeroSectionQuery();
  const { data: aboutData, isLoading: loadingAbout } = useGetAboutUsQuery();
  const { data: featuresData, isLoading: loadingFeatures } = useGetFeaturesQuery();
  const { data: countsData, isLoading: loadingCounts } = useGetCountsQuery();
  const { data: videoData, isLoading: loadingVideo } = useGetIntroVideoQuery();
  const { data: chefData, isLoading: loadingChef } = useGetChefExpertiesQuery();
  const { data: contactData, isLoading: loadingContact } = useGetContactInfoQuery();

  // RTK Mutations
  const [updateHero, { isLoading: savingHero }] = useUpdateHeroSectionMutation();
  const [updateAbout, { isLoading: savingAbout }] = useUpdateAboutUsMutation();
  const [updateFeatures, { isLoading: savingFeatures }] = useUpdateFeaturesMutation();
  const [updateCounts, { isLoading: savingCounts }] = useUpdateCountsMutation();
  const [updateVideo, { isLoading: savingVideo }] = useUpdateIntroVideoMutation();
  const [updateChef, { isLoading: savingChef }] = useUpdateChefExpertiesMutation();
  const [updateContact, { isLoading: savingContact }] = useUpdateContactInfoMutation();

  // Local Form States
  const [heroForm, setHeroForm] = useState({
    title: "",
    description: "",
    background_image: "",
    btn1_text: "",
    btn1_link: "",
    btn2_text: "",
    btn2_link: "",
  });

  const [aboutForm, setAboutForm] = useState({
    title: "",
    description1: "",
    description2: "",
    button_text: "",
    button_link: "",
  });

  const [featuresForm, setFeaturesForm] = useState([
    { title: "", description: "", icon: "" },
    { title: "", description: "", icon: "" },
    { title: "", description: "", icon: "" },
  ]);

  const [countsForm, setCountsForm] = useState([
    { num: 0, dtl: "", amountTyp: "", img: "" },
    { num: 0, dtl: "", amountTyp: "", img: "" },
    { num: 0, dtl: "", amountTyp: "", img: "" },
    { num: 0, dtl: "", amountTyp: "", img: "" },
  ]);

  const [videoForm, setVideoForm] = useState({
    video_url: "",
    thumbnail_url: "",
    title: "",
  });

  const [chefForm, setChefForm] = useState({
    title: "",
    description: "",
    points: ["", "", "", "", "", ""],
    image_url: "",
  });

  const [contactForm, setContactForm] = useState({
    logo_url: "",
    phone: "",
    email: "",
    address: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
  });

  // Sync state when data is loaded
  useEffect(() => {
    if (heroData) {
      setHeroForm({
        title: heroData.title || "Best food for your taste",
        description: heroData.description || "Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.",
        background_image: heroData.background_image || "/assets/banner.png",
        btn1_text: heroData.btn1_text || "Book Table",
        btn1_link: heroData.btn1_link || "/book_table",
        btn2_text: heroData.btn2_text || "Menu",
        btn2_link: heroData.btn2_link || "/menu",
      });
    }
  }, [heroData]);

  useEffect(() => {
    if (aboutData) {
      setAboutForm({
        title: aboutData.title || "We provide healthy food for your family.",
        description1: aboutData.description1 || "Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance.",
        description2: aboutData.description2 || "At place, we believe that dining is not just about food, but also about the overall experience.",
        button_text: aboutData.button_text || "More About Us",
        button_link: aboutData.button_link || "/about",
      });
    }
  }, [aboutData]);

  useEffect(() => {
    if (featuresData && Array.isArray(featuresData) && featuresData.length >= 3) {
      setFeaturesForm(featuresData.map((f: any) => ({
        title: f.title || "",
        description: f.description || "",
        icon: f.icon || "",
      })));
    } else {
      setFeaturesForm([
        { title: "Multi Cuisine", description: "In the new era of technology we look in the future with certainty life.", icon: "/assets/restaurant-menu 1.png" },
        { title: "Easy To Order", description: "In the new era of technology we look in the future with certainty life.", icon: "/assets/order.png" },
        { title: "Fast Delivery", description: "In the new era of technology we look in the future with certainty life.", icon: "/assets/clock.png" },
      ]);
    }
  }, [featuresData]);

  useEffect(() => {
    if (countsData && Array.isArray(countsData) && countsData.length >= 4) {
      setCountsForm(countsData.map((c: any) => ({
        num: Number(c.num) || 0,
        dtl: c.dtl || "",
        amountTyp: c.amountTyp || "",
        img: c.img || "",
      })));
    } else {
      setCountsForm([
        { num: 3400, dtl: "Total Visitor", amountTyp: "M", img: "/assets/location.png" },
        { num: 2080, dtl: "Total happy Customer", amountTyp: "K", img: "/assets/review.png" },
        { num: 3100, dtl: "Total order", amountTyp: "K", img: "/assets/CounterOrder.png" },
        { num: 3000, dtl: "Total Host of Homey", amountTyp: "B+", img: "/assets/database.png" },
      ]);
    }
  }, [countsData]);

  useEffect(() => {
    if (videoData) {
      setVideoForm({
        video_url: videoData.video_url || "/video/AboutVideo.mp4",
        thumbnail_url: videoData.thumbnail_url || "/assets/Food/BG.jpg",
        title: videoData.title || "Feel the authentic & original taste from us",
      });
    }
  }, [videoData]);

  useEffect(() => {
    if (chefData) {
      setChefForm({
        title: chefData.title || "Our Expects Chef",
        description: chefData.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        points: Array.isArray(chefData.points) && chefData.points.length >= 6
          ? chefData.points
          : ["Lorem ipsum dolor sit amet, consectetur", "Lorem ipsum dolor sit amet, consectetur", "Lorem ipsum dolor sit amet, consectetur", "Lorem ipsum dolor sit amet, consectetur", "Lorem ipsum dolor sit amet, consectetur", "Lorem ipsum dolor sit amet, consectetur"],
        image_url: chefData.image_url || "/assets/chef1.png",
      });
    }
  }, [chefData]);

  useEffect(() => {
    if (contactData) {
      setContactForm({
        logo_url: contactData.logo_url || "/assets/logo6.png",
        phone: contactData.phone || "+1 234 567 890",
        email: contactData.email || "info@gourmetgrill.com",
        address: contactData.address || "123 Culinary St, Gourmet City",
        facebook_url: contactData.facebook_url || "https://facebook.com",
        twitter_url: contactData.twitter_url || "https://twitter.com",
        instagram_url: contactData.instagram_url || "https://instagram.com",
      });
    }
  }, [contactData]);

  // Submit Handlers
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHero(heroForm).unwrap();
      toast.success("Hero section updated successfully!");
    } catch (err) {
      toast.error("Failed to update Hero section");
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAbout(aboutForm).unwrap();
      toast.success("About Us section updated successfully!");
    } catch (err) {
      toast.error("Failed to update About Us section");
    }
  };

  const handleSaveFeatures = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateFeatures(featuresForm).unwrap();
      toast.success("Features updated successfully!");
    } catch (err) {
      toast.error("Failed to update Features");
    }
  };

  const handleSaveCounts = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCounts(countsForm).unwrap();
      toast.success("Statistics updated successfully!");
    } catch (err) {
      toast.error("Failed to update Statistics");
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVideo(videoForm).unwrap();
      toast.success("Intro Video section updated successfully!");
    } catch (err) {
      toast.error("Failed to update Intro Video section");
    }
  };

  const handleSaveChef = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateChef(chefForm).unwrap();
      toast.success("Chef Expertise updated successfully!");
    } catch (err) {
      toast.error("Failed to update Chef Expertise");
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContact(contactForm).unwrap();
      toast.success("Contact Details & Navbar updated successfully!");
    } catch (err) {
      toast.error("Failed to update Contact Details");
    }
  };

  // Tabs List
  const tabs = [
    { id: "hero", label: "Banner / Hero" },
    { id: "about", label: "About Us" },
    { id: "features", label: "Features" },
    { id: "counts", label: "Counters / Statistics" },
    { id: "video", label: "Video Highlights" },
    { id: "chefs", label: "Chef Expertise" },
    { id: "contact", label: "Navbar & Contacts" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs list */}
      <div className="flex border-b border-[#2C2F24]/30 overflow-x-auto gap-2 pb-1.5 scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabName)}
            className={`px-6 py-4.5 text-sm font-semibold tracking-wide rounded-t-xl transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-b-2 border-[#C31C1E] text-[#C31C1E] bg-[#C31C1E]/5 bg-gradient-to-t from-[#C31C1E]/5 to-transparent"
                : "text-slate-400 hover:text-white hover:bg-[#474747]/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forms Area */}
      <div className="bg-[#101A24] border border-[#2C2F24]/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C31C1E]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Tab Content: HERO SECTION */}
        {activeTab === "hero" && (
          <form onSubmit={handleSaveHero} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify Hero Banner Widget
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2.5 col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Banner Big Title</label>
                <input
                  type="text"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  placeholder="e.g. Best food for your taste"
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5 col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Banner Paragraph Description</label>
                <textarea
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  placeholder="e.g. Discover delectable cuisine and unforgettable moments..."
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 min-h-24 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5 col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Poster / Background Image Path</label>
                <input
                  type="text"
                  value={heroForm.background_image}
                  onChange={(e) => setHeroForm({ ...heroForm, background_image: e.target.value })}
                  placeholder="e.g. /assets/banner.png"
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Left Button Text</label>
                <input
                  type="text"
                  value={heroForm.btn1_text}
                  onChange={(e) => setHeroForm({ ...heroForm, btn1_text: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Left Button Target Route / Link</label>
                <input
                  type="text"
                  value={heroForm.btn1_link}
                  onChange={(e) => setHeroForm({ ...heroForm, btn1_link: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Right Button Text</label>
                <input
                  type="text"
                  value={heroForm.btn2_text}
                  onChange={(e) => setHeroForm({ ...heroForm, btn2_text: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Right Button Target Route / Link</label>
                <input
                  type="text"
                  value={heroForm.btn2_link}
                  onChange={(e) => setHeroForm({ ...heroForm, btn2_link: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingHero}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingHero ? "Saving Details..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Tab Content: ABOUT US */}
        {activeTab === "about" && (
          <form onSubmit={handleSaveAbout} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify About Us & Family Food Widget
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">About Heading Title</label>
                <input
                  type="text"
                  value={aboutForm.title}
                  onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Paragraph 1 Description</label>
                <textarea
                  value={aboutForm.description1}
                  onChange={(e) => setAboutForm({ ...aboutForm, description1: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 min-h-24 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Paragraph 2 Description</label>
                <textarea
                  value={aboutForm.description2}
                  onChange={(e) => setAboutForm({ ...aboutForm, description2: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 min-h-24 text-sm font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Action Button Text</label>
                  <input
                    type="text"
                    value={aboutForm.button_text}
                    onChange={(e) => setAboutForm({ ...aboutForm, button_text: e.target.value })}
                    className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Action Button Link</label>
                  <input
                    type="text"
                    value={aboutForm.button_link}
                    onChange={(e) => setAboutForm({ ...aboutForm, button_link: e.target.value })}
                    className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingAbout}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingAbout ? "Saving Details..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Tab Content: FEATURES */}
        {activeTab === "features" && (
          <form onSubmit={handleSaveFeatures} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify Bottom Highlights (Features)
            </h3>
            <div className="flex flex-col gap-8">
              {featuresForm.map((feature, index) => (
                <div key={index} className="grid grid-cols-3 gap-6 p-6 bg-[#0B0F19]/40 border border-[#2C2F24]/20 rounded-2xl">
                  <h4 className="text-sm font-bold tracking-wider text-[#C31C1E] col-span-3">Feature #{index + 1}</h4>
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-400">Feature Title</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => {
                        const updated = [...featuresForm];
                        updated[index].title = e.target.value;
                        setFeaturesForm(updated);
                      }}
                      className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-400">Icon Asset URL</label>
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) => {
                        const updated = [...featuresForm];
                        updated[index].icon = e.target.value;
                        setFeaturesForm(updated);
                      }}
                      placeholder="e.g. /assets/order.png"
                      className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2.5 col-span-3">
                    <label className="text-xs uppercase font-bold tracking-wider text-slate-400">Feature Details / Description</label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const updated = [...featuresForm];
                        updated[index].description = e.target.value;
                        setFeaturesForm(updated);
                      }}
                      className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 min-h-16 text-sm font-medium"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={savingFeatures}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingFeatures ? "Saving Features..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Tab Content: STATISTICS */}
        {activeTab === "counts" && (
          <form onSubmit={handleSaveCounts} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify Visitor Counts & Statistics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {countsForm.map((count, index) => (
                <div key={index} className="flex flex-col gap-4 p-6 bg-[#0B0F19]/40 border border-[#2C2F24]/20 rounded-2xl">
                  <h4 className="text-sm font-bold tracking-wider text-[#C31C1E]">Counter Block #{index + 1}</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Number</label>
                      <input
                        type="number"
                        value={count.num}
                        onChange={(e) => {
                          const updated = [...countsForm];
                          updated[index].num = Number(e.target.value) || 0;
                          setCountsForm(updated);
                        }}
                        className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Suffix (e.g. M, K, B+)</label>
                      <input
                        type="text"
                        value={count.amountTyp}
                        onChange={(e) => {
                          const updated = [...countsForm];
                          updated[index].amountTyp = e.target.value;
                          setCountsForm(updated);
                        }}
                        className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Label / Name</label>
                      <input
                        type="text"
                        value={count.dtl}
                        onChange={(e) => {
                          const updated = [...countsForm];
                          updated[index].dtl = e.target.value;
                          setCountsForm(updated);
                        }}
                        className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 col-span-3">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Icon Image Path</label>
                      <input
                        type="text"
                        value={count.img}
                        onChange={(e) => {
                          const updated = [...countsForm];
                          updated[index].img = e.target.value;
                          setCountsForm(updated);
                        }}
                        className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={savingCounts}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingCounts ? "Saving Stats..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Tab Content: VIDEO HIGHLIGHTS */}
        {activeTab === "video" && (
          <form onSubmit={handleSaveVideo} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify Intro Video & Layout Details
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Video Heading Title Overlay</label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Video Link / Asset URL (.mp4)</label>
                <input
                  type="text"
                  value={videoForm.video_url}
                  onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                  placeholder="e.g. /video/AboutVideo.mp4"
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Video Backdrop Image Thumbnail</label>
                <input
                  type="text"
                  value={videoForm.thumbnail_url}
                  onChange={(e) => setVideoForm({ ...videoForm, thumbnail_url: e.target.value })}
                  placeholder="e.g. /assets/Food/BG.jpg"
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingVideo}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingVideo ? "Saving Video Details..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Tab Content: CHEF EXPERTISE */}
        {activeTab === "chefs" && (
          <form onSubmit={handleSaveChef} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify Chef Team Details & Points
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Chefs Heading Title</label>
                <input
                  type="text"
                  value={chefForm.title}
                  onChange={(e) => setChefForm({ ...chefForm, title: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Chefs Section Description</label>
                <textarea
                  value={chefForm.description}
                  onChange={(e) => setChefForm({ ...chefForm, description: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 min-h-24 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Chef Side Poster Image</label>
                <input
                  type="text"
                  value={chefForm.image_url}
                  onChange={(e) => setChefForm({ ...chefForm, image_url: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-[#2C2F24]/20 pt-6">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Chef Highlight Bullets (6 Points)</label>
                <div className="grid grid-cols-2 gap-4">
                  {chefForm.points.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#C31C1E] w-6 shrink-0">#{index + 1}</span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const updatedPoints = [...chefForm.points];
                          updatedPoints[index] = e.target.value;
                          setChefForm({ ...chefForm, points: updatedPoints });
                        }}
                        className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C31C1E] duration-300 flex-1 text-sm font-medium"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingChef}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingChef ? "Saving Chefs..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Tab Content: CONTACT INFO & NAVBAR */}
        {activeTab === "contact" && (
          <form onSubmit={handleSaveContact} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold font-serif border-b border-[#2C2F24]/30 pb-4 text-[#C31C1E]">
              Modify Navbar Branding & Contact Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2.5 col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Navbar Logo Image URL</label>
                <input
                  type="text"
                  value={contactForm.logo_url}
                  onChange={(e) => setContactForm({ ...contactForm, logo_url: e.target.value })}
                  placeholder="e.g. /assets/logo6.png"
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Contact Number</label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Business Support Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5 col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Physical Address</label>
                <input
                  type="text"
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Facebook URL</label>
                <input
                  type="text"
                  value={contactForm.facebook_url}
                  onChange={(e) => setContactForm({ ...contactForm, facebook_url: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Twitter URL</label>
                <input
                  type="text"
                  value={contactForm.twitter_url}
                  onChange={(e) => setContactForm({ ...contactForm, twitter_url: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-2.5 col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-slate-300">Instagram URL</label>
                <input
                  type="text"
                  value={contactForm.instagram_url}
                  onChange={(e) => setContactForm({ ...contactForm, instagram_url: e.target.value })}
                  className="bg-[#0B0F19] border border-[#2C2F24]/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#C31C1E] duration-300 text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingContact}
              className="bg-[#C31C1E] hover:bg-[#A11416] text-white py-4 px-10 rounded-xl font-bold transition-all duration-300 text-sm tracking-wide shadow-lg self-start disabled:opacity-50"
            >
              {savingContact ? "Saving Contacts..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
