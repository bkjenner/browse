import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getActivities = (pageSize) => {
    return useQuery({
        queryKey: ["GET_ACTIVITIES"],
        queryFn: async () => {
            const { data } = await axios.get(`/action/activityBrowse?p_metadata=true&p_pagesize=${pageSize ? pageSize : 100}`);

            return data.activities;
        },
    });
};

export const getActivityTypes = () => {
    return useQuery({
        queryKey: ["GET_ACTIVITY_TYPES"],
        queryFn: async () => {
            const { data } = await axios.get(`/action/getActivityTypes`);
            return data;
        },
    });
};

export const getActivityProjects = () => {
    return useQuery({
        queryKey: ["GET_ACTIVITY_PROJECTS"],
        queryFn: async () => {
            const { data } = await axios.get(`/action/getActivityProjects`);
            return data;
        },
    });
};

export const getActivitiesByType = (activityType) => {
    return useQuery({
        queryKey: ["GET_ACTIVITIES_BY_TYPE", activityType],
        queryFn: async () => {
            if (!activityType) {
                throw new Error("No activity type");
            }
            const { data } = await axios.get(`/action/getActivitiesByType?p_acttypeid=${activityType}`);
            return data;
        },
    });
};

export const getActivitiesByProject = (activityProject) => {
    return useQuery({
        queryKey: ["GET_ACTIVITIES_BY_PROJECT", activityProject],
        queryFn: async () => {
            if (!activityProject) {
                throw new Error("No activity project");
            }
            const { data } = await axios.get(`/action/getActivitiesByProject?p_actprojectid=${activityProject}`);
            return data;
        },
    });
};
