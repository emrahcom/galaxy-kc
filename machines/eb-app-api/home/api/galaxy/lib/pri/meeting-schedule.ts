import { notFound } from "../http/response.ts";
import { pri as wrapper } from "../http/wrapper.ts";
import { getLimit, getOffset } from "../database/common.ts";
import {
  addMeetingSchedule,
  delMeetingSchedule,
  getMeetingSchedule,
  getMeetingScheduleByMeeting,
  getMeetingScheduleByMembership,
  listMeetingScheduleByMeeting,
  updateMeetingSchedule,
  updateMeetingScheduleEnabled,
} from "../database/meeting-schedule.ts";
import type { Attr } from "../database/types.ts";

const PRE = "/api/pri/meeting/schedule";

// -----------------------------------------------------------------------------
async function get(req: Request, identityId: string): Promise<unknown> {
  const pl = await req.json();
  const scheduleId = pl.id;

  return await getMeetingSchedule(identityId, scheduleId);
}

// -----------------------------------------------------------------------------
async function getByMeeting(
  req: Request,
  identityId: string,
): Promise<unknown> {
  const pl = await req.json();
  const meetingId = pl.id;

  return await getMeetingScheduleByMeeting(identityId, meetingId);
}

// -----------------------------------------------------------------------------
async function getByMembership(
  req: Request,
  identityId: string,
): Promise<unknown> {
  const pl = await req.json();
  const membershipId = pl.id;

  return await getMeetingScheduleByMembership(identityId, membershipId);
}

// -----------------------------------------------------------------------------
async function listByMeeting(
  req: Request,
  identityId: string,
): Promise<unknown> {
  const pl = await req.json();
  const meetingId = pl.id;
  const limit = getLimit(pl.limit);
  const offset = getOffset(pl.offset);

  return await listMeetingScheduleByMeeting(
    identityId,
    meetingId,
    limit,
    offset,
  );
}

// -----------------------------------------------------------------------------
async function add(req: Request, identityId: string): Promise<unknown> {
  const pl = await req.json();
  const meetingId = pl.meeting_id;
  const name = pl.name;
  const scheduleAttr = pl.schedule_attr as Attr;

  return await addMeetingSchedule(
    identityId,
    meetingId,
    name,
    scheduleAttr,
  );
}

// -----------------------------------------------------------------------------
async function del(req: Request, identityId: string): Promise<unknown> {
  const pl = await req.json();
  const scheduleId = pl.id;

  return await delMeetingSchedule(identityId, scheduleId);
}

// -----------------------------------------------------------------------------
async function update(req: Request, identityId: string): Promise<unknown> {
  const pl = await req.json();
  const scheduleId = pl.id;
  const name = pl.name;
  const scheduleAttr = pl.schedule_attr as Attr;

  return await updateMeetingSchedule(
    identityId,
    scheduleId,
    name,
    scheduleAttr,
  );
}

// -----------------------------------------------------------------------------
async function enable(req: Request, identityId: string): Promise<unknown> {
  const pl = await req.json();
  const scheduleId = pl.id;

  return await updateMeetingScheduleEnabled(identityId, scheduleId, true);
}

// -----------------------------------------------------------------------------
async function disable(req: Request, identityId: string): Promise<unknown> {
  const pl = await req.json();
  const scheduleId = pl.id;

  return await updateMeetingScheduleEnabled(identityId, scheduleId, false);
}

// -----------------------------------------------------------------------------
export default async function (
  req: Request,
  path: string,
  identityId: string,
): Promise<Response> {
  if (path === `${PRE}/get`) {
    return await wrapper(get, req, identityId);
  } else if (path === `${PRE}/get/bymeeting`) {
    return await wrapper(getByMeeting, req, identityId);
  } else if (path === `${PRE}/get/bymembership`) {
    return await wrapper(getByMembership, req, identityId);
  } else if (path === `${PRE}/list/bymeeting`) {
    return await wrapper(listByMeeting, req, identityId);
  } else if (path === `${PRE}/add`) {
    return await wrapper(add, req, identityId);
  } else if (path === `${PRE}/del`) {
    return await wrapper(del, req, identityId);
  } else if (path === `${PRE}/update`) {
    return await wrapper(update, req, identityId);
  } else if (path === `${PRE}/enable`) {
    return await wrapper(enable, req, identityId);
  } else if (path === `${PRE}/disable`) {
    return await wrapper(disable, req, identityId);
  } else {
    return notFound();
  }
}
