import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { Task } from "../Redux/features/task/taskSlice";
import store from "../Redux/store";

export type Actions =
    | "view"
    | "manage"
    | "create"
    | "read"
    | "update"
    | "delete";

type Subjects = "Task" | Task | "TaskList" | "UserList";

export type AppAbility = Ability<[Actions, Subjects]>;
export const appAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: string) {
    const { can, rules } = new AbilityBuilder(appAbility);

    if (role === "admin") {
        can("view", "UserList");
        can(["read", "create"], "Task");
    } else if (role === "tutor") {
        can(["read", "create"], "Task");
        can(["update", "delete"], "Task", { assignee: "me" });
    } else {
        can("view", "Task", { assignee: "me" });
    }

    // const routePermissionsFromApi: string[] = [];
    // can(routePermissionsFromApi, "route");

    return rules;
}

export function buildAbilityFor(role: string): AppAbility {
    return new appAbility(defineRulesFor(role), {
        // https://casl.js.org/v5/en/guide/subject-type-detection
        detectSubjectType: (object) => object!.type
    });
}
